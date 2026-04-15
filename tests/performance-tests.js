#!/usr/bin/env node

import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';
import chalk from 'chalk';
import fs from 'fs-extra';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

class PerformanceTests {
  constructor() {
    this.results = {
      lighthouse: null,
      customMetrics: {},
      passed: 0,
      failed: 0,
      total: 0
    };
  }

  async runLighthouseAudit() {
    console.log(chalk.blue('🚀 Executando auditoria Lighthouse...'));
    
    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const { lhr } = await lighthouse(BASE_URL, {
        port: new URL(browser.wsEndpoint()).port,
        output: 'json',
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
      });

      await browser.close();

      this.results.lighthouse = {
        performance: Math.round(lhr.categories.performance.score * 100),
        accessibility: Math.round(lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
        metrics: {
          firstContentfulPaint: lhr.audits['first-contentful-paint'].numericValue,
          largestContentfulPaint: lhr.audits['largest-contentful-paint'].numericValue,
          cumulativeLayoutShift: lhr.audits['cumulative-layout-shift'].numericValue,
          totalBlockingTime: lhr.audits['total-blocking-time'].numericValue,
          speedIndex: lhr.audits['speed-index'].numericValue
        }
      };

      console.log(chalk.green('✅ Auditoria Lighthouse concluída'));
      return true;
    } catch (error) {
      console.error(chalk.red('❌ Erro na auditoria Lighthouse:'), error.message);
      return false;
    }
  }

  async testLoadTime() {
    console.log(chalk.gray('  • Testando tempo de carregamento'));
    this.results.total++;

    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      
      const startTime = Date.now();
      await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      const loadTime = Date.now() - startTime;

      await browser.close();

      this.results.customMetrics.loadTime = loadTime;

      // Página deve carregar em menos de 3 segundos
      if (loadTime > 3000) {
        throw new Error(`Tempo de carregamento muito alto: ${loadTime}ms`);
      }

      console.log(chalk.green(`    ✅ Tempo de carregamento: ${loadTime}ms`));
      this.results.passed++;
    } catch (error) {
      console.log(chalk.red(`    ❌ Teste de tempo de carregamento: ${error.message}`));
      this.results.failed++;
    }
  }

  async testResourceSizes() {
    console.log(chalk.gray('  • Testando tamanhos de recursos'));
    this.results.total++;

    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      
      // Interceptar requests para medir tamanhos
      const resources = [];
      page.on('response', async (response) => {
        try {
          const url = response.url();
          const size = parseInt(response.headers()['content-length'] || '0');
          const type = response.headers()['content-type'] || '';
          
          resources.push({
            url,
            size,
            type,
            status: response.status()
          });
        } catch (error) {
          // Ignorar erros de response
        }
      });

      await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      await browser.close();

      // Analisar recursos
      const totalSize = resources.reduce((sum, resource) => sum + resource.size, 0);
      const imageSize = resources
        .filter(r => r.type.startsWith('image/'))
        .reduce((sum, resource) => sum + resource.size, 0);
      const jsSize = resources
        .filter(r => r.type.includes('javascript'))
        .reduce((sum, resource) => sum + resource.size, 0);
      const cssSize = resources
        .filter(r => r.type.includes('css'))
        .reduce((sum, resource) => sum + resource.size, 0);

      this.results.customMetrics.resourceSizes = {
        total: totalSize,
        images: imageSize,
        javascript: jsSize,
        css: cssSize
      };

      // Verificar se tamanhos estão dentro dos limites aceitáveis
      const totalSizeMB = totalSize / (1024 * 1024);
      if (totalSizeMB > 5) {
        throw new Error(`Tamanho total muito grande: ${totalSizeMB.toFixed(2)}MB`);
      }

      console.log(chalk.green(`    ✅ Tamanho total: ${totalSizeMB.toFixed(2)}MB`));
      this.results.passed++;
    } catch (error) {
      console.log(chalk.red(`    ❌ Teste de tamanhos de recursos: ${error.message}`));
      this.results.failed++;
    }
  }

  async testImageOptimization() {
    console.log(chalk.gray('  • Testando otimização de imagens'));
    this.results.total++;

    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

      // Verificar se imagens têm atributos alt
      const imagesWithoutAlt = await page.$$eval('img', imgs => 
        imgs.filter(img => !img.alt || img.alt.trim() === '').length
      );

      // Verificar se imagens têm dimensões definidas
      const imagesWithoutDimensions = await page.$$eval('img', imgs =>
        imgs.filter(img => !img.width && !img.height && 
          !img.style.width && !img.style.height).length
      );

      await browser.close();

      this.results.customMetrics.imageOptimization = {
        imagesWithoutAlt,
        imagesWithoutDimensions
      };

      if (imagesWithoutAlt > 0) {
        console.log(chalk.yellow(`    ⚠️  ${imagesWithoutAlt} imagens sem atributo alt`));
      }

      if (imagesWithoutDimensions > 5) {
        throw new Error(`Muitas imagens sem dimensões: ${imagesWithoutDimensions}`);
      }

      console.log(chalk.green('    ✅ Otimização de imagens adequada'));
      this.results.passed++;
    } catch (error) {
      console.log(chalk.red(`    ❌ Teste de otimização de imagens: ${error.message}`));
      this.results.failed++;
    }
  }

  async testCacheHeaders() {
    console.log(chalk.gray('  • Testando headers de cache'));
    this.results.total++;

    try {
      const response = await fetch(BASE_URL);
      const headers = Object.fromEntries(response.headers.entries());

      this.results.customMetrics.cacheHeaders = headers;

      // Verificar headers de cache importantes
      const hasEtag = headers.etag;
      const hasCacheControl = headers['cache-control'];
      const hasLastModified = headers['last-modified'];

      if (!hasCacheControl && !hasEtag && !hasLastModified) {
        throw new Error('Nenhum header de cache encontrado');
      }

      console.log(chalk.green('    ✅ Headers de cache configurados'));
      this.results.passed++;
    } catch (error) {
      console.log(chalk.red(`    ❌ Teste de headers de cache: ${error.message}`));
      this.results.failed++;
    }
  }

  async testMobilePerformance() {
    console.log(chalk.gray('  • Testando performance mobile'));
    this.results.total++;

    try {
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      
      // Simular dispositivo móvel
      await page.emulate({
        name: 'iPhone 12',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
        viewport: {
          width: 390,
          height: 844,
          deviceScaleFactor: 3,
          isMobile: true,
          hasTouch: true,
          isLandscape: false
        }
      });

      // Simular conexão 3G
      await page.emulateNetworkConditions({
        offline: false,
        downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5 Mbps
        uploadThroughput: 750 * 1024 / 8, // 750 Kbps
        latency: 40
      });

      const startTime = Date.now();
      await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
      const mobileLoadTime = Date.now() - startTime;

      await browser.close();

      this.results.customMetrics.mobileLoadTime = mobileLoadTime;

      // Mobile deve carregar em menos de 5 segundos em 3G
      if (mobileLoadTime > 5000) {
        throw new Error(`Performance mobile ruim: ${mobileLoadTime}ms`);
      }

      console.log(chalk.green(`    ✅ Performance mobile: ${mobileLoadTime}ms`));
      this.results.passed++;
    } catch (error) {
      console.log(chalk.red(`    ❌ Teste de performance mobile: ${error.message}`));
      this.results.failed++;
    }
  }

  evaluateScores() {
    console.log(chalk.blue('\n📊 Avaliando scores de performance...'));
    
    if (!this.results.lighthouse) {
      console.log(chalk.red('❌ Dados do Lighthouse não disponíveis'));
      return;
    }

    const { lighthouse } = this.results;
    
    // Critérios de avaliação
    const criteria = {
      performance: { min: 80, weight: 0.4 },
      accessibility: { min: 90, weight: 0.2 },
      bestPractices: { min: 85, weight: 0.2 },
      seo: { min: 85, weight: 0.2 }
    };

    let totalScore = 0;
    let issues = [];

    Object.entries(criteria).forEach(([category, config]) => {
      const score = lighthouse[category];
      totalScore += score * config.weight;
      
      if (score < config.min) {
        issues.push(`${category}: ${score} (mínimo: ${config.min})`);
      }
      
      const color = score >= config.min ? chalk.green : chalk.red;
      console.log(color(`  ${category}: ${score}/100`));
    });

    console.log(chalk.blue(`\nScore geral: ${Math.round(totalScore)}/100`));

    if (issues.length > 0) {
      console.log(chalk.red('\n⚠️  Issues encontradas:'));
      issues.forEach(issue => console.log(chalk.red(`  • ${issue}`)));
    }

    return { totalScore: Math.round(totalScore), issues };
  }

  async saveResults() {
    const resultsDir = './test-results';
    await fs.ensureDir(resultsDir);
    
    const report = {
      timestamp: new Date().toISOString(),
      url: BASE_URL,
      lighthouse: this.results.lighthouse,
      customMetrics: this.results.customMetrics,
      summary: {
        total: this.results.total,
        passed: this.results.passed,
        failed: this.results.failed,
        successRate: Math.round((this.results.passed / this.results.total) * 100)
      }
    };

    await fs.writeJson(`${resultsDir}/performance-report.json`, report, { spaces: 2 });
    console.log(chalk.blue(`\n📄 Relatório salvo em: ${resultsDir}/performance-report.json`));
  }

  printSummary() {
    console.log(chalk.blue('\n📊 Resumo dos Testes de Performance:'));
    console.log(`Total: ${this.results.total}`);
    console.log(chalk.green(`Passou: ${this.results.passed}`));
    console.log(chalk.red(`Falhou: ${this.results.failed}`));
    console.log(`Taxa de sucesso: ${Math.round((this.results.passed / this.results.total) * 100)}%`);

    if (this.results.lighthouse) {
      console.log(chalk.blue('\nScores Lighthouse:'));
      console.log(`Performance: ${this.results.lighthouse.performance}/100`);
      console.log(`Accessibility: ${this.results.lighthouse.accessibility}/100`);
      console.log(`Best Practices: ${this.results.lighthouse.bestPractices}/100`);
      console.log(`SEO: ${this.results.lighthouse.seo}/100`);
    }
  }
}

// Executar testes
async function main() {
  const tests = new PerformanceTests();
  
  try {
    console.log(chalk.blue('🚀 Iniciando testes de performance...'));
    
    await tests.runLighthouseAudit();
    await tests.testLoadTime();
    await tests.testResourceSizes();
    await tests.testImageOptimization();
    await tests.testCacheHeaders();
    await tests.testMobilePerformance();
    
    tests.evaluateScores();
    await tests.saveResults();
    tests.printSummary();
    
    process.exit(tests.results.failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error(chalk.red('❌ Erro ao executar testes de performance:'), error.message);
    process.exit(1);
  }
}

main();