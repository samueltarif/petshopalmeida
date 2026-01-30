#!/usr/bin/env node

import puppeteer from 'puppeteer';
import chalk from 'chalk';
import fs from 'fs-extra';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

class IntegrationTests {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  async init() {
    console.log(chalk.blue('🔗 Iniciando testes de integração...'));
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width: 1280, height: 720 });
  }

  async runTest(name, testFn) {
    console.log(chalk.gray(`  • ${name}`));
    this.results.total++;
    
    try {
      await testFn();
      this.results.passed++;
      this.results.tests.push({ name, status: 'PASSED', error: null });
      console.log(chalk.green(`    ✅ ${name}`));
    } catch (error) {
      this.results.failed++;
      this.results.tests.push({ name, status: 'FAILED', error: error.message });
      console.log(chalk.red(`    ❌ ${name}: ${error.message}`));
    }
  }

  async testFullUserJourney() {
    await this.runTest('Jornada completa do usuário', async () => {
      // 1. Carregar página inicial
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // 2. Verificar se hero está visível
      const heroVisible = await this.page.$('.hero');
      if (!heroVisible) {
        throw new Error('Hero section não encontrada');
      }
      
      // 3. Navegar para seção de serviços
      await this.page.click('nav a[href="#servicos"]');
      await this.page.waitForTimeout(1000);
      
      // 4. Verificar se chegou na seção correta
      const servicesInView = await this.page.$eval('#servicos', el => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      
      if (!servicesInView) {
        throw new Error('Navegação para serviços não funcionou');
      }
      
      // 5. Interagir com um card de serviço (se houver interação)
      const serviceCards = await this.page.$$('.service-card');
      if (serviceCards.length > 0) {
        await serviceCards[0].hover();
        await this.page.waitForTimeout(500);
      }
      
      // 6. Usar botão CTA para ir ao contato
      await this.page.click('.cta-button-custom');
      await this.page.waitForTimeout(1000);
      
      // 7. Verificar se chegou na seção de contato
      const contactInView = await this.page.$eval('#contato', el => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      
      if (!contactInView) {
        throw new Error('Botão CTA não levou ao contato');
      }
      
      // 8. Testar link do WhatsApp
      const whatsappLink = await this.page.$('a[href*="whatsapp"]');
      if (whatsappLink) {
        const href = await whatsappLink.evaluate(el => el.href);
        if (!href.includes('wa.me') && !href.includes('whatsapp.com')) {
          throw new Error('Link do WhatsApp inválido');
        }
      }
    });
  }

  async testMobileUserFlow() {
    await this.runTest('Fluxo do usuário mobile', async () => {
      // Configurar viewport mobile
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // 1. Verificar se menu mobile está presente
      const menuToggle = await this.page.$('.menu-toggle');
      if (!menuToggle) {
        throw new Error('Menu toggle não encontrado no mobile');
      }
      
      // 2. Abrir menu mobile
      await this.page.click('.menu-toggle');
      await this.page.waitForTimeout(500);
      
      // 3. Verificar se menu abriu
      const menuOpen = await this.page.$eval('nav', el => {
        const style = window.getComputedStyle(el);
        return style.transform !== 'translateX(-100%)';
      });
      
      if (!menuOpen) {
        throw new Error('Menu mobile não abriu');
      }
      
      // 4. Navegar usando menu mobile
      await this.page.click('nav a[href="#servicos"]');
      await this.page.waitForTimeout(1000);
      
      // 5. Verificar se menu fechou após navegação
      const menuClosed = await this.page.$eval('nav', el => {
        const style = window.getComputedStyle(el);
        return style.transform === 'translateX(-100%)';
      });
      
      if (!menuClosed) {
        throw new Error('Menu mobile não fechou após navegação');
      }
      
      // 6. Verificar se rolou para seção correta
      const servicesVisible = await this.page.$eval('#servicos', el => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight;
      });
      
      if (!servicesVisible) {
        throw new Error('Navegação mobile para serviços falhou');
      }
    });
  }

  async testServiceInteractions() {
    await this.runTest('Interações com serviços', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Navegar para seção de serviços
      await this.page.evaluate(() => {
        document.querySelector('#servicos').scrollIntoView();
      });
      await this.page.waitForTimeout(1000);
      
      // Verificar se cards de serviços têm informações essenciais
      const serviceData = await this.page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.service-card'));
        return cards.map(card => ({
          hasTitle: card.querySelector('h3, h4, .service-title') !== null,
          hasPrice: card.textContent.includes('R$') || card.textContent.includes('Preço'),
          hasDescription: card.querySelector('p, .description') !== null,
          hasIcon: card.querySelector('svg, img, .icon') !== null
        }));
      });
      
      if (serviceData.length === 0) {
        throw new Error('Nenhum card de serviço encontrado');
      }
      
      // Verificar se pelo menos 80% dos cards têm as informações essenciais
      const validCards = serviceData.filter(card => 
        card.hasTitle && (card.hasPrice || card.hasDescription)
      );
      
      const validPercentage = (validCards.length / serviceData.length) * 100;
      if (validPercentage < 80) {
        throw new Error(`Apenas ${validPercentage.toFixed(1)}% dos cards têm informações completas`);
      }
    });
  }

  async testPaymentSection() {
    await this.runTest('Seção de pagamentos', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Navegar para seção de pagamentos
      await this.page.evaluate(() => {
        const paymentSection = document.querySelector('#pagamento');
        if (paymentSection) {
          paymentSection.scrollIntoView();
        }
      });
      await this.page.waitForTimeout(1000);
      
      // Verificar se seção de pagamentos existe
      const paymentSection = await this.page.$('#pagamento');
      if (!paymentSection) {
        throw new Error('Seção de pagamentos não encontrada');
      }
      
      // Verificar métodos de pagamento
      const paymentMethods = await this.page.evaluate(() => {
        const section = document.querySelector('#pagamento');
        if (!section) return [];
        
        const text = section.textContent.toLowerCase();
        const methods = [];
        
        if (text.includes('pix')) methods.push('PIX');
        if (text.includes('cartão') || text.includes('card')) methods.push('Cartão');
        if (text.includes('dinheiro') || text.includes('cash')) methods.push('Dinheiro');
        if (text.includes('débito') || text.includes('debit')) methods.push('Débito');
        
        return methods;
      });
      
      if (paymentMethods.length < 2) {
        throw new Error(`Poucos métodos de pagamento encontrados: ${paymentMethods.join(', ')}`);
      }
    });
  }

  async testContactIntegration() {
    await this.runTest('Integração de contatos', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Navegar para seção de contato
      await this.page.evaluate(() => {
        document.querySelector('#contato').scrollIntoView();
      });
      await this.page.waitForTimeout(1000);
      
      // Verificar informações de contato
      const contactInfo = await this.page.evaluate(() => {
        const section = document.querySelector('#contato');
        if (!section) return null;
        
        return {
          hasPhone: section.querySelector('a[href^="tel:"]') !== null,
          hasWhatsApp: section.querySelector('a[href*="whatsapp"]') !== null,
          hasAddress: section.textContent.includes('Av.') || section.textContent.includes('Rua'),
          hasInstagram: section.textContent.includes('@') || section.textContent.includes('instagram')
        };
      });
      
      if (!contactInfo) {
        throw new Error('Seção de contato não encontrada');
      }
      
      if (!contactInfo.hasPhone) {
        throw new Error('Link do telefone não encontrado');
      }
      
      if (!contactInfo.hasWhatsApp) {
        throw new Error('Link do WhatsApp não encontrado');
      }
      
      // Testar se links funcionam (sem clicar)
      const phoneLink = await this.page.$('a[href^="tel:"]');
      const phoneHref = await phoneLink.evaluate(el => el.href);
      
      if (!phoneHref.startsWith('tel:')) {
        throw new Error('Link do telefone malformado');
      }
      
      const whatsappLink = await this.page.$('a[href*="whatsapp"]');
      const whatsappHref = await whatsappLink.evaluate(el => el.href);
      
      if (!whatsappHref.includes('wa.me') && !whatsappHref.includes('whatsapp.com')) {
        throw new Error('Link do WhatsApp malformado');
      }
    });
  }

  async testCrossPageNavigation() {
    await this.runTest('Navegação entre páginas', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Verificar se há links para outras páginas
      const internalLinks = await this.page.$$eval('a[href^="/"]', links => 
        links.map(link => link.href).filter(href => !href.includes('#'))
      );
      
      if (internalLinks.length === 0) {
        console.log('    ℹ️  Nenhum link interno encontrado - site de página única');
        return;
      }
      
      // Testar navegação para primeira página interna
      const firstLink = internalLinks[0];
      await this.page.goto(firstLink, { waitUntil: 'networkidle0' });
      
      // Verificar se página carregou corretamente
      const pageTitle = await this.page.title();
      if (!pageTitle || pageTitle.trim() === '') {
        throw new Error('Página interna sem título');
      }
      
      // Verificar se header ainda está presente
      const headerExists = await this.page.$('header');
      if (!headerExists) {
        throw new Error('Header não presente em página interna');
      }
      
      // Voltar para página inicial
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const backToHome = await this.page.$('.hero');
      if (!backToHome) {
        throw new Error('Não conseguiu voltar para página inicial');
      }
    });
  }

  async testErrorHandling() {
    await this.runTest('Tratamento de erros', async () => {
      // Testar página 404
      const notFoundUrl = `${BASE_URL}/pagina-inexistente`;
      const response = await this.page.goto(notFoundUrl, { waitUntil: 'networkidle0' });
      
      // Verificar se retorna 404 ou redireciona adequadamente
      if (response.status() === 200) {
        // Se retorna 200, deve ser um redirecionamento ou página de erro customizada
        const pageContent = await this.page.content();
        const isErrorPage = pageContent.includes('404') || 
                           pageContent.includes('não encontrada') ||
                           pageContent.includes('not found');
        
        if (!isErrorPage) {
          console.log('    ⚠️  Página 404 pode não estar configurada adequadamente');
        }
      }
      
      // Testar links quebrados (simulação)
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Verificar se há tratamento de erros JavaScript
      const jsErrors = [];
      this.page.on('pageerror', error => {
        jsErrors.push(error.message);
      });
      
      // Simular erro clicando em elemento que pode não existir
      try {
        await this.page.click('#elemento-inexistente', { timeout: 1000 });
      } catch (error) {
        // Esperado - elemento não existe
      }
      
      await this.page.waitForTimeout(1000);
      
      // Verificar se não há erros JavaScript críticos
      const criticalErrors = jsErrors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('404') &&
        error.includes('Error')
      );
      
      if (criticalErrors.length > 0) {
        throw new Error(`Erros JavaScript críticos: ${criticalErrors.join(', ')}`);
      }
    });
  }

  async testPerformanceIntegration() {
    await this.runTest('Integração de performance', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Medir tempo de interação
      const interactionTime = await this.page.evaluate(() => {
        return new Promise((resolve) => {
          const startTime = performance.now();
          
          // Simular interação
          const button = document.querySelector('.cta-button-custom');
          if (button) {
            button.click();
            
            setTimeout(() => {
              const endTime = performance.now();
              resolve(endTime - startTime);
            }, 100);
          } else {
            resolve(0);
          }
        });
      });
      
      if (interactionTime > 500) {
        throw new Error(`Interação muito lenta: ${interactionTime}ms`);
      }
      
      // Verificar se animações não causam problemas
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      
      await this.page.waitForTimeout(2000);
      
      // Verificar se página ainda responde
      const responsive = await this.page.evaluate(() => {
        return document.readyState === 'complete';
      });
      
      if (!responsive) {
        throw new Error('Página não responde após animações');
      }
    });
  }

  async runAllTests() {
    await this.testFullUserJourney();
    await this.testMobileUserFlow();
    await this.testServiceInteractions();
    await this.testPaymentSection();
    await this.testContactIntegration();
    await this.testCrossPageNavigation();
    await this.testErrorHandling();
    await this.testPerformanceIntegration();
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async saveResults() {
    const resultsDir = './test-results';
    await fs.ensureDir(resultsDir);
    
    const report = {
      timestamp: new Date().toISOString(),
      url: BASE_URL,
      summary: {
        total: this.results.total,
        passed: this.results.passed,
        failed: this.results.failed,
        successRate: Math.round((this.results.passed / this.results.total) * 100)
      },
      tests: this.results.tests
    };

    await fs.writeJson(`${resultsDir}/integration-report.json`, report, { spaces: 2 });
    console.log(chalk.blue(`\n📄 Relatório salvo em: ${resultsDir}/integration-report.json`));
  }

  printResults() {
    console.log(chalk.blue('\n📊 Resultados dos Testes de Integração:'));
    console.log(`Total: ${this.results.total}`);
    console.log(chalk.green(`Passou: ${this.results.passed}`));
    console.log(chalk.red(`Falhou: ${this.results.failed}`));
    console.log(`Taxa de sucesso: ${Math.round((this.results.passed / this.results.total) * 100)}%`);
    
    if (this.results.failed > 0) {
      console.log(chalk.red('\nTestes que falharam:'));
      this.results.tests
        .filter(test => test.status === 'FAILED')
        .forEach(test => {
          console.log(chalk.red(`  • ${test.name}: ${test.error}`));
        });
    }
  }
}

// Executar testes
async function main() {
  const tests = new IntegrationTests();
  
  try {
    await tests.init();
    await tests.runAllTests();
    await tests.saveResults();
    tests.printResults();
    
    process.exit(tests.results.failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error(chalk.red('❌ Erro ao executar testes de integração:'), error.message);
    process.exit(1);
  } finally {
    await tests.cleanup();
  }
}

main();