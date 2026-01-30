#!/usr/bin/env node

import puppeteer from 'puppeteer';
import chalk from 'chalk';
import fs from 'fs-extra';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

class AccessibilityTests {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      tests: [],
      violations: []
    };
  }

  async init() {
    console.log(chalk.blue('♿ Iniciando testes de acessibilidade...'));
    
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

  async testSemanticHTML() {
    await this.runTest('Estrutura HTML semântica', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Verificar elementos semânticos essenciais
      const semanticElements = await this.page.evaluate(() => {
        const elements = {
          header: document.querySelector('header'),
          nav: document.querySelector('nav'),
          main: document.querySelector('main'),
          footer: document.querySelector('footer'),
          sections: document.querySelectorAll('section').length,
          articles: document.querySelectorAll('article').length
        };
        
        return elements;
      });
      
      if (!semanticElements.header) {
        throw new Error('Elemento <header> não encontrado');
      }
      
      if (!semanticElements.nav) {
        throw new Error('Elemento <nav> não encontrado');
      }
      
      if (semanticElements.sections === 0) {
        throw new Error('Nenhum elemento <section> encontrado');
      }
    });
  }

  async testHeadingHierarchy() {
    await this.runTest('Hierarquia de cabeçalhos', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const headings = await this.page.evaluate(() => {
        const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        return headingElements.map(h => ({
          level: parseInt(h.tagName.charAt(1)),
          text: h.textContent.trim(),
          hasContent: h.textContent.trim().length > 0
        }));
      });
      
      if (headings.length === 0) {
        throw new Error('Nenhum cabeçalho encontrado');
      }
      
      // Deve ter pelo menos um H1
      const h1Count = headings.filter(h => h.level === 1).length;
      if (h1Count === 0) {
        throw new Error('Nenhum elemento H1 encontrado');
      }
      
      if (h1Count > 1) {
        throw new Error('Múltiplos elementos H1 encontrados');
      }
      
      // Verificar se todos os cabeçalhos têm conteúdo
      const emptyHeadings = headings.filter(h => !h.hasContent);
      if (emptyHeadings.length > 0) {
        throw new Error('Cabeçalhos vazios encontrados');
      }
      
      // Verificar hierarquia (não pular níveis)
      for (let i = 1; i < headings.length; i++) {
        const current = headings[i];
        const previous = headings[i - 1];
        
        if (current.level > previous.level + 1) {
          throw new Error(`Hierarquia quebrada: H${previous.level} seguido por H${current.level}`);
        }
      }
    });
  }

  async testImageAltText() {
    await this.runTest('Texto alternativo em imagens', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const imageIssues = await this.page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        const issues = [];
        
        images.forEach((img, index) => {
          if (!img.alt) {
            issues.push(`Imagem ${index + 1}: sem atributo alt`);
          } else if (img.alt.trim() === '') {
            issues.push(`Imagem ${index + 1}: atributo alt vazio`);
          }
        });
        
        return { total: images.length, issues };
      });
      
      if (imageIssues.issues.length > 0) {
        throw new Error(`Problemas com alt text: ${imageIssues.issues.join(', ')}`);
      }
      
      if (imageIssues.total === 0) {
        console.log('    ℹ️  Nenhuma imagem encontrada');
      }
    });
  }

  async testKeyboardNavigation() {
    await this.runTest('Navegação por teclado', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Verificar se elementos interativos são focáveis
      const focusableElements = await this.page.evaluate(() => {
        const selectors = [
          'a[href]',
          'button:not([disabled])',
          'input:not([disabled])',
          'textarea:not([disabled])',
          'select:not([disabled])',
          '[tabindex]:not([tabindex="-1"])'
        ];
        
        const elements = [];
        selectors.forEach(selector => {
          document.querySelectorAll(selector).forEach(el => {
            elements.push({
              tag: el.tagName.toLowerCase(),
              type: el.type || null,
              tabIndex: el.tabIndex,
              visible: el.offsetHeight > 0 && el.offsetWidth > 0
            });
          });
        });
        
        return elements;
      });
      
      if (focusableElements.length === 0) {
        throw new Error('Nenhum elemento focável encontrado');
      }
      
      // Testar navegação por Tab
      await this.page.keyboard.press('Tab');
      const firstFocused = await this.page.evaluate(() => document.activeElement.tagName);
      
      if (!firstFocused || firstFocused === 'BODY') {
        throw new Error('Primeiro elemento não recebeu foco');
      }
      
      // Verificar se menu mobile é acessível por teclado
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.reload({ waitUntil: 'networkidle0' });
      
      const menuToggle = await this.page.$('.menu-toggle');
      if (menuToggle) {
        await menuToggle.focus();
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
        
        // Verificar se menu abriu
        const menuVisible = await this.page.$eval('nav', el => {
          const style = window.getComputedStyle(el);
          return style.transform !== 'translateX(-100%)';
        });
        
        if (!menuVisible) {
          throw new Error('Menu mobile não abre com teclado');
        }
      }
    });
  }

  async testColorContrast() {
    await this.runTest('Contraste de cores', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Verificar contraste básico através de análise de cores
      const contrastIssues = await this.page.evaluate(() => {
        const issues = [];
        
        // Função para calcular luminância
        function getLuminance(r, g, b) {
          const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        }
        
        // Função para calcular contraste
        function getContrast(color1, color2) {
          const l1 = getLuminance(...color1);
          const l2 = getLuminance(...color2);
          const lighter = Math.max(l1, l2);
          const darker = Math.min(l1, l2);
          return (lighter + 0.05) / (darker + 0.05);
        }
        
        // Verificar elementos de texto principais
        const textElements = document.querySelectorAll('h1, h2, h3, p, a, button');
        
        textElements.forEach((el, index) => {
          const styles = window.getComputedStyle(el);
          const color = styles.color;
          const backgroundColor = styles.backgroundColor;
          
          // Análise básica - apenas verificar se cores são muito claras
          if (color === 'rgb(255, 255, 255)' && backgroundColor === 'rgba(0, 0, 0, 0)') {
            issues.push(`Elemento ${index + 1}: texto branco em fundo transparente`);
          }
        });
        
        return issues;
      });
      
      if (contrastIssues.length > 0) {
        console.log(chalk.yellow(`    ⚠️  Possíveis problemas de contraste: ${contrastIssues.length}`));
        // Não falhar o teste, apenas avisar
      }
    });
  }

  async testAriaLabels() {
    await this.runTest('Labels e ARIA attributes', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const ariaIssues = await this.page.evaluate(() => {
        const issues = [];
        
        // Verificar botões sem label
        const buttons = document.querySelectorAll('button');
        buttons.forEach((btn, index) => {
          const hasText = btn.textContent.trim().length > 0;
          const hasAriaLabel = btn.getAttribute('aria-label');
          const hasAriaLabelledby = btn.getAttribute('aria-labelledby');
          
          if (!hasText && !hasAriaLabel && !hasAriaLabelledby) {
            issues.push(`Botão ${index + 1}: sem label acessível`);
          }
        });
        
        // Verificar inputs sem label
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach((input, index) => {
          const hasLabel = document.querySelector(`label[for="${input.id}"]`);
          const hasAriaLabel = input.getAttribute('aria-label');
          const hasAriaLabelledby = input.getAttribute('aria-labelledby');
          
          if (!hasLabel && !hasAriaLabel && !hasAriaLabelledby) {
            issues.push(`Input ${index + 1}: sem label associado`);
          }
        });
        
        // Verificar links sem texto
        const links = document.querySelectorAll('a[href]');
        links.forEach((link, index) => {
          const hasText = link.textContent.trim().length > 0;
          const hasAriaLabel = link.getAttribute('aria-label');
          
          if (!hasText && !hasAriaLabel) {
            issues.push(`Link ${index + 1}: sem texto ou aria-label`);
          }
        });
        
        return issues;
      });
      
      if (ariaIssues.length > 0) {
        throw new Error(`Problemas com ARIA: ${ariaIssues.join(', ')}`);
      }
    });
  }

  async testFormAccessibility() {
    await this.runTest('Acessibilidade de formulários', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const formIssues = await this.page.evaluate(() => {
        const issues = [];
        const forms = document.querySelectorAll('form');
        
        if (forms.length === 0) {
          return ['Nenhum formulário encontrado - teste pulado'];
        }
        
        forms.forEach((form, formIndex) => {
          // Verificar se formulário tem fieldsets para grupos
          const fieldsets = form.querySelectorAll('fieldset');
          const inputs = form.querySelectorAll('input, textarea, select');
          
          if (inputs.length > 5 && fieldsets.length === 0) {
            issues.push(`Formulário ${formIndex + 1}: muitos campos sem fieldset`);
          }
          
          // Verificar mensagens de erro
          const errorElements = form.querySelectorAll('[role="alert"], .error, .invalid');
          inputs.forEach((input, inputIndex) => {
            if (input.hasAttribute('aria-invalid') && input.getAttribute('aria-invalid') === 'true') {
              const hasErrorMessage = input.getAttribute('aria-describedby');
              if (!hasErrorMessage) {
                issues.push(`Input ${inputIndex + 1}: inválido sem mensagem de erro`);
              }
            }
          });
        });
        
        return issues;
      });
      
      if (formIssues.length > 0 && !formIssues[0].includes('teste pulado')) {
        throw new Error(`Problemas em formulários: ${formIssues.join(', ')}`);
      }
      
      if (formIssues[0] && formIssues[0].includes('teste pulado')) {
        console.log('    ℹ️  Nenhum formulário encontrado');
      }
    });
  }

  async testLandmarks() {
    await this.runTest('Landmarks de navegação', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const landmarks = await this.page.evaluate(() => {
        return {
          banner: document.querySelector('[role="banner"], header'),
          navigation: document.querySelector('[role="navigation"], nav'),
          main: document.querySelector('[role="main"], main'),
          contentinfo: document.querySelector('[role="contentinfo"], footer'),
          complementary: document.querySelectorAll('[role="complementary"], aside').length
        };
      });
      
      if (!landmarks.banner) {
        throw new Error('Landmark banner/header não encontrado');
      }
      
      if (!landmarks.navigation) {
        throw new Error('Landmark navigation/nav não encontrado');
      }
      
      // Main é opcional mas recomendado
      if (!landmarks.main) {
        console.log('    ⚠️  Landmark main não encontrado (recomendado)');
      }
    });
  }

  async testScreenReaderContent() {
    await this.runTest('Conteúdo para leitores de tela', async () => {
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      const srIssues = await this.page.evaluate(() => {
        const issues = [];
        
        // Verificar skip links
        const skipLinks = document.querySelectorAll('a[href^="#"]');
        const hasSkipToMain = Array.from(skipLinks).some(link => 
          link.textContent.toLowerCase().includes('pular') ||
          link.textContent.toLowerCase().includes('skip') ||
          link.href.includes('#main') ||
          link.href.includes('#content')
        );
        
        if (!hasSkipToMain && skipLinks.length === 0) {
          issues.push('Nenhum skip link encontrado');
        }
        
        // Verificar elementos ocultos visualmente mas acessíveis
        const srOnlyElements = document.querySelectorAll('.sr-only, .visually-hidden, .screen-reader-text');
        
        // Verificar se há conteúdo importante apenas visual
        const decorativeElements = document.querySelectorAll('[aria-hidden="true"]');
        
        return {
          issues,
          skipLinks: skipLinks.length,
          srOnlyElements: srOnlyElements.length,
          decorativeElements: decorativeElements.length
        };
      });
      
      if (srIssues.issues.length > 0) {
        console.log(chalk.yellow(`    ⚠️  ${srIssues.issues.join(', ')}`));
        // Não falhar o teste, apenas avisar
      }
    });
  }

  async runAllTests() {
    await this.testSemanticHTML();
    await this.testHeadingHierarchy();
    await this.testImageAltText();
    await this.testKeyboardNavigation();
    await this.testColorContrast();
    await this.testAriaLabels();
    await this.testFormAccessibility();
    await this.testLandmarks();
    await this.testScreenReaderContent();
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
      tests: this.results.tests,
      violations: this.results.violations
    };

    await fs.writeJson(`${resultsDir}/accessibility-report.json`, report, { spaces: 2 });
    console.log(chalk.blue(`\n📄 Relatório salvo em: ${resultsDir}/accessibility-report.json`));
  }

  printResults() {
    console.log(chalk.blue('\n📊 Resultados dos Testes de Acessibilidade:'));
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
  const tests = new AccessibilityTests();
  
  try {
    await tests.init();
    await tests.runAllTests();
    await tests.saveResults();
    tests.printResults();
    
    process.exit(tests.results.failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error(chalk.red('❌ Erro ao executar testes de acessibilidade:'), error.message);
    process.exit(1);
  } finally {
    await tests.cleanup();
  }
}

main();