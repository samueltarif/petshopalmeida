#!/usr/bin/env node

/**
 * Script Principal de Testes
 * Executa todos os testes do sistema
 */

import SystemHealthChecker from './system-health-check.js';
import FunctionalTester from './functional-tests.js';
import PerformanceTester from './performance-tests.js';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class TestRunner {
  constructor() {
    this.results = {
      health: null,
      functional: null,
      performance: null
    };
  }

  log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
  }

  async runAllTests() {
    this.log(`${colors.bold}${colors.cyan}🧪 EXECUTANDO SUITE COMPLETA DE TESTES${colors.reset}`);
    this.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);
    this.log('');

    const startTime = Date.now();

    try {
      // 1. Testes de Saúde do Sistema
      this.log(`${colors.bold}${colors.blue}1️⃣  TESTES DE SAÚDE DO SISTEMA${colors.reset}`);
      this.log(`${colors.blue}${'─'.repeat(40)}${colors.reset}`);
      const healthChecker = new SystemHealthChecker();
      const healthResult = await healthChecker.runAllTests();
      this.results.health = healthResult;
      this.log('');

      // 2. Testes Funcionais
      this.log(`${colors.bold}${colors.magenta}2️⃣  TESTES FUNCIONAIS${colors.reset}`);
      this.log(`${colors.magenta}${'─'.repeat(40)}${colors.reset}`);
      const functionalTester = new FunctionalTester();
      const functionalResult = await functionalTester.runAllTests();
      this.results.functional = functionalResult;
      this.log('');

      // 3. Testes de Performance
      this.log(`${colors.bold}${colors.yellow}3️⃣  TESTES DE PERFORMANCE${colors.reset}`);
      this.log(`${colors.yellow}${'─'.repeat(40)}${colors.reset}`);
      const performanceTester = new PerformanceTester();
      const performanceResult = await performanceTester.runAllTests();
      this.results.performance = performanceResult;
      this.log('');

      // Relatório Final
      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);
      
      this.generateFinalReport(duration);

    } catch (error) {
      this.log(`${colors.red}❌ Erro durante execução dos testes: ${error.message}${colors.reset}`);
      process.exit(1);
    }
  }

  generateFinalReport(duration) {
    this.log(`${colors.bold}${colors.cyan}📊 RELATÓRIO FINAL CONSOLIDADO${colors.reset}`);
    this.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);
    this.log('');

    // Status de cada categoria
    this.log(`${colors.bold}📋 RESUMO POR CATEGORIA:${colors.reset}`);
    this.log('');

    // Saúde do Sistema
    const healthStatus = this.results.health ? '✅ PASSOU' : '❌ FALHOU';
    const healthColor = this.results.health ? colors.green : colors.red;
    this.log(`🏥 Saúde do Sistema: ${healthColor}${healthStatus}${colors.reset}`);

    // Funcionalidades
    const functionalStatus = this.results.functional ? '✅ PASSOU' : '❌ FALHOU';
    const functionalColor = this.results.functional ? colors.green : colors.red;
    this.log(`⚙️  Funcionalidades: ${functionalColor}${functionalStatus}${colors.reset}`);

    // Performance
    const performanceScore = this.results.performance?.score || 0;
    const performanceStatus = performanceScore >= 70 ? '✅ BOA' : performanceScore >= 50 ? '⚠️  MÉDIA' : '❌ RUIM';
    const performanceColor = performanceScore >= 70 ? colors.green : performanceScore >= 50 ? colors.yellow : colors.red;
    this.log(`⚡ Performance: ${performanceColor}${performanceStatus} (${performanceScore}%)${colors.reset}`);

    this.log('');
    this.log(`${colors.bold}⏱️  TEMPO DE EXECUÇÃO: ${duration}s${colors.reset}`);
    this.log('');

    // Status geral
    const allPassed = this.results.health && this.results.functional && performanceScore >= 70;
    const hasWarnings = !this.results.health || !this.results.functional || performanceScore < 90;

    if (allPassed && performanceScore >= 90) {
      this.log(`${colors.bold}${colors.green}🎉 SISTEMA FUNCIONANDO PERFEITAMENTE!${colors.reset}`);
      this.log(`${colors.green}   Todos os testes passaram com excelente performance.${colors.reset}`);
    } else if (allPassed) {
      this.log(`${colors.bold}${colors.green}✅ SISTEMA FUNCIONANDO CORRETAMENTE!${colors.reset}`);
      this.log(`${colors.yellow}   Algumas otimizações de performance podem ser aplicadas.${colors.reset}`);
    } else {
      this.log(`${colors.bold}${colors.red}⚠️  SISTEMA PRECISA DE ATENÇÃO!${colors.reset}`);
      this.log(`${colors.red}   Alguns problemas foram encontrados e precisam ser corrigidos.${colors.reset}`);
    }

    this.log('');

    // Recomendações
    this.generateRecommendations();

    // Próximos passos
    this.generateNextSteps();

    return allPassed;
  }

  generateRecommendations() {
    this.log(`${colors.bold}💡 RECOMENDAÇÕES:${colors.reset}`);
    this.log('');

    if (!this.results.health) {
      this.log(`${colors.red}🔧 Corrigir problemas de configuração básica${colors.reset}`);
      this.log(`   - Verificar dependências faltando`);
      this.log(`   - Corrigir arquivos de configuração`);
      this.log(`   - Executar npm install se necessário`);
      this.log('');
    }

    if (!this.results.functional) {
      this.log(`${colors.yellow}⚙️  Implementar funcionalidades faltando${colors.reset}`);
      this.log(`   - Completar componentes de serviços`);
      this.log(`   - Adicionar informações de contato`);
      this.log(`   - Configurar SEO adequadamente`);
      this.log('');
    }

    const performanceScore = this.results.performance?.score || 0;
    if (performanceScore < 90) {
      this.log(`${colors.yellow}⚡ Melhorar performance${colors.reset}`);
      this.log(`   - Otimizar imagens (WebP, compressão)`);
      this.log(`   - Implementar lazy loading`);
      this.log(`   - Configurar cache adequadamente`);
      this.log(`   - Minimizar CSS e JavaScript`);
      this.log('');
    }
  }

  generateNextSteps() {
    this.log(`${colors.bold}🚀 PRÓXIMOS PASSOS:${colors.reset}`);
    this.log('');

    if (!this.results.health || !this.results.functional) {
      this.log(`${colors.cyan}1. Corrigir problemas críticos encontrados${colors.reset}`);
      this.log(`2. Executar testes novamente: npm run test`);
      this.log(`3. Verificar se aplicação inicia: npm run dev`);
    } else {
      this.log(`${colors.cyan}1. Testar aplicação manualmente: npm run dev${colors.reset}`);
      this.log(`2. Fazer build de produção: npm run build`);
      this.log(`3. Testar build: npm run preview`);
    }

    this.log(`4. Executar testes de segurança: npm run security-test`);
    this.log(`5. Deploy para ambiente de teste`);
    this.log('');

    // Comandos úteis
    this.log(`${colors.bold}📝 COMANDOS ÚTEIS:${colors.reset}`);
    this.log(`${colors.cyan}npm run dev${colors.reset}          # Iniciar servidor de desenvolvimento`);
    this.log(`${colors.cyan}npm run build${colors.reset}        # Build de produção`);
    this.log(`${colors.cyan}npm run preview${colors.reset}      # Preview do build`);
    this.log(`${colors.cyan}npm run test${colors.reset}         # Executar todos os testes`);
    this.log(`${colors.cyan}npm run lint${colors.reset}         # Verificar código`);
    this.log('');
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const runner = new TestRunner();
  runner.runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error(`${colors.red}Erro fatal: ${error.message}${colors.reset}`);
    process.exit(1);
  });
}

export default TestRunner;