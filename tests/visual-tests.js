#!/usr/bin/env node

import puppeteer from 'puppeteer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

class VisualTests {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      tests: [],
      screenshots: []
    };
    this.screenshotDir = './test-results/screenshots';
  }

  async init() {
    console.log(chalk.blue('📸 Iniciando testes visuais...'));
    
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    await fs.ensureDir(this.screenshotDir);
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

  async takeScreenshot(name, viewport = null) {
    if (viewport) {
      await this.page.setViewport(viewport);
    }
    
    const filename = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    const filepath = path.join(this.screenshotDir, filename);
    
    await this.page.screenshot({
      path: filepath,
      fullPage: true
    });
    
    this.results.screenshots.push({
      name,
      filename,
      filepath,
      viewport: viewport || await this.page.viewport()
    });
    
    return filepath;
  }

  async testResponsiveDesign() {
    await this.runTest('Design responsivo em diferentes viewports', async () => {
      const viewports = [
        { width: 1920, height: 1080, name: 'Desktop XL' },
        { width: 1280, height: 720, name: 'Desktop' },
        { width: 1024, height: 768, name: 'Tablet Landscape' },
        { width: 768, height: 1024, name: 'Tablet Portrait' },
        { width: 414, height: 896, name: 'Mobile Large' },
        { width: 375, height: 667, name: 'Mobile Medium' },
        { width: 320, height: 568, name: 'Mobile Small' }
      ];

      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });

      for (const viewport of viewports) {
        await this.page.setViewport(viewport);
        await this.page.waitForTimeout(1000);
        
        // Verificar se não há overflow horizontal
        const hasHorizontalScroll = await this.page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });
        
        if (hasHorizontalScroll) {
          throw new Error(`Overflow horizontal em ${viewport.name}`);
        }
        
        // Verificar se elementos principais estão visíveis
        const elementsVisible = await this.page.evaluate(() => {
          const selectors = ['header', '.hero', '#servicos'];
          return selectors.every(selector => {
            const el = document.querySelector(selector);
            return el && el.offsetHeight > 0 && el.offsetWidth > 0;
          });
        });
        
        if (!elementsVisible) {
          throw new Error(`Elementos não visíveis em ${viewport.name}`);
        }
        
        // Tirar screenshot
        await this.takeScreenshot(`responsive-${viewport.name}`, viewport);
      }
    });
  }

  async testLayoutConsistency() {
    await this.runTest('Consistência do layout', async () => {
      await this.page.setViewport({ width: 1280, height: 720 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Verificar alinhamento dos elementos
      const layoutIssues = await this.page.evaluate(() => {
        const issues = [];
        
        // Verificar se cards de serviços têm altura similar
        const serviceCards = Array.from(document.querySelectorAll('.service-card'));
        if (serviceCards.length > 1) {
          const heights = serviceCards.map(card => card.offsetHeight);
          const maxHeight = Math.max(...heights);
          const minHeight = Math.min(...heights);
          const heightDiff = maxHeight - minHeight;
          
          if (heightDiff > 100) {
            issues.push(`Cards de serviços com alturas muito diferentes: ${heightDiff}px`);
          }
        }
        
        // Verificar alinhamento do header
        const header = document.querySelector('header');
        if (header) {
          const headerRect = header.getBoundingClientRect();
          if (headerRect.left !== 0) {
            issues.push('Header não alinhado à esquerda');
          }
        }
        
        // Verificar se seções têm espaçamento consistente
        const sections = Array.from(document.querySelectorAll('section'));
        const spacings = [];
        
        for (let i = 1; i < sections.length; i++) {
          const prevSection = sections[i - 1];
          const currentSection = sections[i];
          const spacing = currentSection.getBoundingClientRect().top - 
                         prevSection.getBoundingClientRect().bottom;
          spacings.push(spacing);
        }
        
        if (spacings.length > 1) {
          const avgSpacing = spacings.reduce((a, b) => a + b, 0) / spacings.length;
          const inconsistentSpacing = spacings.some(spacing => 
            Math.abs(spacing - avgSpacing) > 50
          );
          
          if (inconsistentSpacing) {
            issues.push('Espaçamento inconsistente entre seções');
          }
        }
        
        return issues;
      });
      
      if (layoutIssues.length > 0) {
        throw new Error(`Problemas de layout: ${layoutIssues.join(', ')}`);
      }
      
      await this.takeScreenshot('layout-consistency');
    });
  }

  async testColorScheme() {
    await this.runTest('Esquema de cores e contraste visual', async () => {
      await this.page.setViewport({ width: 1280, height: 720 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Verificar se cores estão sendo aplicadas corretamente
      const colorIssues = await this.page.evaluate(() => {
        const issues = [];
        
        // Verificar se elementos têm cores definidas
        const importantElements = document.querySelectorAll('h1, h2, h3, .cta-button-custom, nav a');
        
        importantElements.forEach((el, index) => {
          const styles = window.getComputedStyle(el);
          const color = styles.color;
          const backgroundColor = styles.backgroundColor;
          
          // Verificar se não está usando cores padrão do browser
          if (color === 'rgb(0, 0, 0)' && backgroundColor === 'rgba(0, 0, 0, 0)') {
            issues.push(`Elemento ${el.tagName} ${index + 1} usando cores padrão`);
          }
        });
        
        // Verificar se botão CTA tem estilo destacado
        const ctaButton = document.querySelector('.cta-button-custom');
        if (ctaButton) {
          const styles = window.getComputedStyle(ctaButton);
          const hasBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
          const hasBorder = styles.borderWidth !== '0px' || styles.borderRadius !== '0px';
          
          if (!hasBackground && !hasBorder) {
            issues.push('Botão CTA sem estilo destacado');
          }
        }
        
        return issues;
      });
      
      if (colorIssues.length > 0) {
        console.log(chalk.yellow(`    ⚠️  Possíveis problemas de cor: ${colorIssues.join(', ')}`));
        // Não falhar o teste, apenas avisar
      }
      
      await this.takeScreenshot('color-scheme');
    });
  }

  async testAnimationsAndTransitions() {
    await this.runTest('Animações e transições', async () => {
      await this.page.setViewport({ width: 1280, height: 720 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Testar animações de scroll
      await this.page.evaluate(() => {
        window.scrollTo(0, 0);
      });
      await this.page.waitForTimeout(500);
      
      // Rolar lentamente para ativar animações
      await this.page.evaluate(() => {
        const servicesSection = document.querySelector('#servicos');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      
      await this.page.waitForTimeout(2000);
      
      // Verificar se animações foram aplicadas
      const animationStatus = await this.page.evaluate(() => {
        const animatedElements = document.querySelectorAll('.fade-in, .service-card');
        let animatedCount = 0;
        
        animatedElements.forEach(el => {
          const styles = window.getComputedStyle(el);
          if (styles.opacity === '1' && styles.transform !== 'none') {
            animatedCount++;
          }
        });
        
        return {
          total: animatedElements.length,
          animated: animatedCount
        };
      });
      
      // Testar hover effects
      const serviceCards = await this.page.$$('.service-card');
      if (serviceCards.length > 0) {
        await serviceCards[0].hover();
        await this.page.waitForTimeout(500);
        
        const hoverEffect = await this.page.evaluate(() => {
          const card = document.querySelector('.service-card:hover');
          if (card) {
            const styles = window.getComputedStyle(card);
            return styles.transform !== 'none' || styles.boxShadow !== 'none';
          }
          return false;
        });
        
        if (!hoverEffect) {
          console.log('    ℹ️  Nenhum efeito hover detectado nos cards');
        }
      }
      
      await this.takeScreenshot('animations-transitions');
    });
  }

  async testMobileLayout() {
    await this.runTest('Layout mobile específico', async () => {
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Verificar se menu mobile está funcionando visualmente
      const menuToggle = await this.page.$('.menu-toggle');
      if (!menuToggle) {
        throw new Error('Menu toggle não encontrado no mobile');
      }
      
      // Verificar se menu toggle está visível
      const toggleVisible = await menuToggle.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.display !== 'none' && el.offsetHeight > 0;
      });
      
      if (!toggleVisible) {
        throw new Error('Menu toggle não está visível no mobile');
      }
      
      // Tirar screenshot do estado inicial
      await this.takeScreenshot('mobile-initial', { width: 375, height: 667 });
      
      // Abrir menu mobile
      await this.page.click('.menu-toggle');
      await this.page.waitForTimeout(500);
      
      // Tirar screenshot com menu aberto
      await this.takeScreenshot('mobile-menu-open', { width: 375, height: 667 });
      
      // Verificar se menu está visualmente aberto
      const menuVisible = await this.page.$eval('nav', el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      
      if (!menuVisible) {
        throw new Error('Menu mobile não está visualmente aberto');
      }
      
      // Verificar se hero está adequado no mobile
      const heroHeight = await this.page.$eval('.hero', el => el.offsetHeight);
      const viewportHeight = 667;
      
      if (heroHeight < viewportHeight * 0.5) {
        console.log('    ⚠️  Hero pode estar muito pequeno no mobile');
      }
    });
  }

  async testPrintStyles() {
    await this.runTest('Estilos de impressão', async () => {
      await this.page.setViewport({ width: 1280, height: 720 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Simular mídia de impressão
      await this.page.emulateMediaType('print');
      await this.page.waitForTimeout(1000);
      
      // Verificar se elementos desnecessários estão ocultos
      const printLayout = await this.page.evaluate(() => {
        const nav = document.querySelector('nav');
        const footer = document.querySelector('footer');
        const buttons = document.querySelectorAll('button');
        
        return {
          navVisible: nav ? window.getComputedStyle(nav).display !== 'none' : false,
          footerVisible: footer ? window.getComputedStyle(footer).display !== 'none' : true,
          buttonsVisible: Array.from(buttons).some(btn => 
            window.getComputedStyle(btn).display !== 'none'
          )
        };
      });
      
      // Tirar screenshot da versão de impressão
      await this.takeScreenshot('print-version');
      
      // Voltar para mídia screen
      await this.page.emulateMediaType('screen');
      
      console.log('    ℹ️  Teste de impressão concluído (verificação manual recomendada)');
    });
  }

  async testImageRendering() {
    await this.runTest('Renderização de imagens', async () => {
      await this.page.setViewport({ width: 1280, height: 720 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Verificar se imagens carregaram corretamente
      const imageStatus = await this.page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img'));
        const results = [];
        
        images.forEach((img, index) => {
          results.push({
            index,
            loaded: img.complete && img.naturalHeight !== 0,
            hasAlt: !!img.alt,
            hasDimensions: img.width > 0 && img.height > 0,
            src: img.src
          });
        });
        
        return results;
      });
      
      const failedImages = imageStatus.filter(img => !img.loaded);
      if (failedImages.length > 0) {
        throw new Error(`${failedImages.length} imagens falharam ao carregar`);
      }
      
      const imagesWithoutAlt = imageStatus.filter(img => !img.hasAlt);
      if (imagesWithoutAlt.length > 0) {
        console.log(`    ⚠️  ${imagesWithoutAlt.length} imagens sem texto alternativo`);
      }
      
      await this.takeScreenshot('image-rendering');
    });
  }

  async testFontRendering() {
    await this.runTest('Renderização de fontes', async () => {
      await this.page.setViewport({ width: 1280, height: 720 });
      await this.page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      
      // Aguardar carregamento das fontes
      await this.page.waitForTimeout(2000);
      
      // Verificar se fontes customizadas foram carregadas
      const fontStatus = await this.page.evaluate(() => {
        const elements = document.querySelectorAll('h1, h2, h3, p, .logo');
        const fonts = new Set();
        
        elements.forEach(el => {
          const fontFamily = window.getComputedStyle(el).fontFamily;
          fonts.add(fontFamily);
        });
        
        return Array.from(fonts);
      });
      
      // Verificar se não está usando apenas fontes padrão
      const hasCustomFonts = fontStatus.some(font => 
        !font.includes('serif') && 
        !font.includes('sans-serif') && 
        !font.includes('monospace')
      );
      
      if (!hasCustomFonts) {
        console.log('    ℹ️  Apenas fontes padrão detectadas');
      }
      
      await this.takeScreenshot('font-rendering');
    });
  }

  async runAllTests() {
    await this.testResponsiveDesign();
    await this.testLayoutConsistency();
    await this.testColorScheme();
    await this.testAnimationsAndTransitions();
    await this.testMobileLayout();
    await this.testPrintStyles();
    await this.testImageRendering();
    await this.testFontRendering();
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
      screenshots: this.results.screenshots.map(screenshot => ({
        name: screenshot.name,
        filename: screenshot.filename,
        viewport: screenshot.viewport
      }))
    };

    await fs.writeJson(`${resultsDir}/visual-report.json`, report, { spaces: 2 });
    console.log(chalk.blue(`\n📄 Relatório salvo em: ${resultsDir}/visual-report.json`));
    console.log(chalk.blue(`📸 Screenshots salvos em: ${this.screenshotDir}/`));
  }

  printResults() {
    console.log(chalk.blue('\n📊 Resultados dos Testes Visuais:'));
    console.log(`Total: ${this.results.total}`);
    console.log(chalk.green(`Passou: ${this.results.passed}`));
    console.log(chalk.red(`Falhou: ${this.results.failed}`));
    console.log(`Taxa de sucesso: ${Math.round((this.results.passed / this.results.total) * 100)}%`);
    console.log(`Screenshots capturados: ${this.results.screenshots.length}`);
    
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
  const tests = new VisualTests();
  
  try {
    await tests.init();
    await tests.runAllTests();
    await tests.saveResults();
    tests.printResults();
    
    process.exit(tests.results.failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error(chalk.red('❌ Erro ao executar testes visuais:'), error.message);
    process.exit(1);
  } finally {
    await tests.cleanup();
  }
}

main();