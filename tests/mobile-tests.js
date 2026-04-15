#!/usr/bin/env node

import puppeteer from 'puppeteer';
import chalk from 'chalk';
import fs from 'fs-extra';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

class MobileTests {
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
    console.log(chalk.blue('📱 Iniciando testes mobile...'));
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
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

  async testTouchTargets() {
    await this.runTest('Tamanhos de alvos de toque adequados', async () => {
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const touchTargets = await this.page.evaluate(() => {
        const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [onclick], [role="button"]');
        const smallTargets = [];
        
        interactiveElements.forEach((el, index) => {
          const rect = el.getBoundingClientRect();
          const minSize = 44; // Tamanho mínimo recomendado (44px)
          
          if (rect.width < minSize || rect.height < minSize) {
            smallTargets.push({
              index,
              element: el.tagName.toLowerCase(),
              width: rect.width,
              height: rect.height,
              text: el.textContent.trim().substring(0, 30)
            });
          }
        });
        
        return {
          total: interactiveElements.length,
          smallTargets
        };
      });
      
      if (touchTargets.smallTargets.length > 0) {
        const criticalSmall = touchTargets.smallTargets.filter(target => 
          target.width < 32 || target.height < 32
        );
        
        if (criticalSmall.length > 0) {
          throw new Error(`${criticalSmall.length} alvos de toque muito pequenos (< 32px)`);
        } else {
          console.log(`    ⚠️  ${touchTargets.smallTargets.length} alvos menores que 44px (recomendado)`);
        }
      }
    });
  }

  async testMobileNavigation() {
    await this.runTest('Navegação mobile funcional', async () => {
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Verificar se menu hamburger está presente
      const menuToggle = await this.page.$('.menu-toggle');
      if (!menuToggle) {
        throw new Error('Menu hamburger não encontrado');
      }
      
      // Verificar se menu está inicialmente fechado
      const initialMenuState = await this.page.$eval('nav', el => {
        const styles = window.getComputedStyle(el);
        return styles.transform === 'translateX(-100%)' || styles.display === 'none';
      });
      
      if (!initialMenuState) {
        throw new Error('Menu não está inicialmente fechado');
      }
      
      // Abrir menu
      await this.page.click('.menu-toggle');
      await this.page.waitForTimeout(500);
      
      // Verificar se menu abriu
      const menuOpen = await this.page.$eval('nav', el => {
        const styles = window.getComputedStyle(el);
        return styles.transform !== 'translateX(-100%)' && styles.display !== 'none';
      });
      
      if (!menuOpen) {
        throw new Error('Menu não abriu após clique');
      }
      
      // Testar navegação por link do menu
      const menuLinks = await this.page.$$('nav a[href^="#"]');
      if (menuLinks.length > 0) {
        await menuLinks[0].click();
        await this.page.waitForTimeout(1000);
        
        // Verificar se menu fechou após navegação
        const menuClosed = await this.page.$eval('nav', el => {
          const styles = window.getComputedStyle(el);
          return styles.transform === 'translateX(-100%)' || styles.display === 'none';
        });
        
        if (!menuClosed) {
          throw new Error('Menu não fechou após navegação');
        }
      }
    });
  }

  async testMobilePerformance() {
    await this.runTest('Performance em dispositivos móveis', async () => {
      // Simular dispositivo móvel com CPU mais lenta
      await this.page.emulateNetworkConditions({
        offline: false,
        downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5 Mbps
        uploadThroughput: 750 * 1024 / 8, // 750 Kbps
        latency: 40
      });
      
      await this.page.setCPUThrottling(4); // 4x slower CPU
      await this.page.setViewport({ width: 375, height: 667 });
      
      const startTime = Date.now();
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      const loadTime = Date.now() - startTime;
      
      // Resetar throttling
      await this.page.setCPUThrottling(1);
      await this.page.emulateNetworkConditions({
        offline: false,
        downloadThroughput: 0,
        uploadThroughput: 0,
        latency: 0
      });
      
      // Mobile deve carregar em menos de 8 segundos com throttling
      if (loadTime > 8000) {
        throw new Error(`Carregamento muito lento no mobile: ${loadTime}ms`);
      }
      
      console.log(`    ℹ️  Tempo de carregamento mobile: ${loadTime}ms`);
    });
  }

  async testTouchGestures() {
    await this.runTest('Gestos de toque funcionais', async () => {
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Testar scroll vertical
      const initialScrollY = await this.page.evaluate(() => window.scrollY);
      
      // Simular swipe para baixo
      await this.page.touchscreen.tap(200, 300);
      await this.page.evaluate(() => {
        window.scrollBy(0, 500);
      });
      await this.page.waitForTimeout(500);
      
      const afterScrollY = await this.page.evaluate(() => window.scrollY);
      
      if (afterScrollY <= initialScrollY) {
        throw new Error('Scroll vertical não funcionou');
      }
      
      // Testar tap em elementos
      const ctaButton = await this.page.$('.cta-button-custom');
      if (ctaButton) {
        const buttonRect = await ctaButton.boundingBox();
        await this.page.touchscreen.tap(
          buttonRect.x + buttonRect.width / 2,
          buttonRect.y + buttonRect.height / 2
        );
        await this.page.waitForTimeout(1000);
        
        // Verificar se ação do botão funcionou (scroll para contato)
        const contactInView = await this.page.$eval('#contato', el => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight;
        });
        
        if (!contactInView) {
          throw new Error('Tap no botão CTA não funcionou');
        }
      }
    });
  }

  async testMobileViewportMeta() {
    await this.runTest('Meta tag viewport configurada corretamente', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const viewportMeta = await this.page.$eval('meta[name="viewport"]', el => el.content);
      
      if (!viewportMeta) {
        throw new Error('Meta tag viewport não encontrada');
      }
      
      const requiredProperties = ['width=device-width', 'initial-scale=1'];
      const missingProperties = requiredProperties.filter(prop => 
        !viewportMeta.includes(prop)
      );
      
      if (missingProperties.length > 0) {
        throw new Error(`Propriedades viewport ausentes: ${missingProperties.join(', ')}`);
      }
      
      // Verificar se não tem user-scalable=no (prejudica acessibilidade)
      if (viewportMeta.includes('user-scalable=no')) {
        console.log('    ⚠️  user-scalable=no pode prejudicar acessibilidade');
      }
    });
  }

  async testMobileTextReadability() {
    await this.runTest('Legibilidade do texto no mobile', async () => {
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const textIssues = await this.page.evaluate(() => {
        const issues = [];
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
        
        textElements.forEach((el, index) => {
          const styles = window.getComputedStyle(el);
          const fontSize = parseFloat(styles.fontSize);
          const lineHeight = parseFloat(styles.lineHeight);
          
          // Texto muito pequeno para mobile
          if (fontSize < 14) {
            issues.push(`Elemento ${index + 1}: fonte muito pequena (${fontSize}px)`);
          }
          
          // Line-height muito baixo
          if (lineHeight && lineHeight < fontSize * 1.2) {
            issues.push(`Elemento ${index + 1}: line-height muito baixo`);
          }
        });
        
        return issues;
      });
      
      const criticalIssues = textIssues.filter(issue => issue.includes('muito pequena'));
      if (criticalIssues.length > 5) {
        throw new Error(`Muitos textos pequenos: ${criticalIssues.length}`);
      }
      
      if (textIssues.length > 0) {
        console.log(`    ⚠️  ${textIssues.length} possíveis problemas de legibilidade`);
      }
    });
  }

  async testMobileFormUsability() {
    await this.runTest('Usabilidade de formulários no mobile', async () => {
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const forms = await this.page.$$('form');
      
      if (forms.length === 0) {
        console.log('    ℹ️  Nenhum formulário encontrado');
        return;
      }
      
      for (const form of forms) {
        // Verificar inputs
        const inputs = await form.$$('input, textarea, select');
        
        for (const input of inputs) {
          const inputInfo = await input.evaluate(el => ({
            type: el.type,
            hasLabel: !!document.querySelector(`label[for="${el.id}"]`),
            hasPlaceholder: !!el.placeholder,
            width: el.offsetWidth,
            height: el.offsetHeight
          }));
          
          // Input muito pequeno para mobile
          if (inputInfo.height < 44) {
            throw new Error(`Input muito pequeno para toque: ${inputInfo.height}px`);
          }
          
          // Input sem label ou placeholder
          if (!inputInfo.hasLabel && !inputInfo.hasPlaceholder) {
            throw new Error('Input sem label ou placeholder');
          }
        }
      }
    });
  }

  async testMobileOrientation() {
    await this.runTest('Suporte a orientação landscape/portrait', async () => {
      // Testar portrait
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const portraitLayout = await this.page.evaluate(() => {
        const header = document.querySelector('header');
        const hero = document.querySelector('.hero');
        
        return {
          headerVisible: header && header.offsetHeight > 0,
          heroVisible: hero && hero.offsetHeight > 0,
          hasHorizontalScroll: document.body.scrollWidth > window.innerWidth
        };
      });
      
      if (!portraitLayout.headerVisible || !portraitLayout.heroVisible) {
        throw new Error('Elementos não visíveis em portrait');
      }
      
      if (portraitLayout.hasHorizontalScroll) {
        throw new Error('Scroll horizontal em portrait');
      }
      
      // Testar landscape
      await this.page.setViewport({ width: 667, height: 375 });
      await this.page.waitForTimeout(1000);
      
      const landscapeLayout = await this.page.evaluate(() => {
        const header = document.querySelector('header');
        const hero = document.querySelector('.hero');
        
        return {
          headerVisible: header && header.offsetHeight > 0,
          heroVisible: hero && hero.offsetHeight > 0,
          hasHorizontalScroll: document.body.scrollWidth > window.innerWidth
        };
      });
      
      if (!landscapeLayout.headerVisible || !landscapeLayout.heroVisible) {
        throw new Error('Elementos não visíveis em landscape');
      }
      
      if (landscapeLayout.hasHorizontalScroll) {
        throw new Error('Scroll horizontal em landscape');
      }
    });
  }

  async testMobileAccessibility() {
    await this.runTest('Acessibilidade mobile', async () => {
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Verificar se elementos focáveis são acessíveis por teclado virtual
      const focusableElements = await this.page.$$('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
      
      if (focusableElements.length === 0) {
        throw new Error('Nenhum elemento focável encontrado');
      }
      
      // Testar foco no primeiro elemento
      await focusableElements[0].focus();
      const firstFocused = await this.page.evaluate(() => document.activeElement.tagName);
      
      if (!firstFocused || firstFocused === 'BODY') {
        throw new Error('Primeiro elemento não recebeu foco');
      }
      
      // Verificar se menu mobile tem ARIA labels adequados
      const menuToggle = await this.page.$('.menu-toggle');
      if (menuToggle) {
        const ariaLabel = await menuToggle.evaluate(el => 
          el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')
        );
        
        if (!ariaLabel) {
          console.log('    ⚠️  Menu toggle sem aria-label');
        }
      }
    });
  }

  async runAllTests() {
    await this.testTouchTargets();
    await this.testMobileNavigation();
    await this.testMobilePerformance();
    await this.testTouchGestures();
    await this.testMobileViewportMeta();
    await this.testMobileTextReadability();
    await this.testMobileFormUsability();
    await this.testMobileOrientation();
    await this.testMobileAccessibility();
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

    await fs.writeJson(`${resultsDir}/mobile-report.json`, report, { spaces: 2 });
    console.log(chalk.blue(`\n📄 Relatório salvo em: ${resultsDir}/mobile-report.json`));
  }

  printResults() {
    console.log(chalk.blue('\n📊 Resultados dos Testes Mobile:'));
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
  const tests = new MobileTests();
  
  try {
    await tests.init();
    await tests.runAllTests();
    await tests.saveResults();
    tests.printResults();
    
    process.exit(tests.results.failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error(chalk.red('❌ Erro ao executar testes mobile:'), error.message);
    process.exit(1);
  } finally {
    await tests.cleanup();
  }
}

main();