#!/usr/bin/env node

/**
 * Script de Verificação de Saúde do Sistema
 * Testa funcionalidades básicas da aplicação Nuxt
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class SystemHealthChecker {
  constructor() {
    this.results = [];
    this.errors = [];
  }

  log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
  }

  success(message) {
    this.log(`✅ ${message}`, colors.green);
    this.results.push({ status: 'success', message });
  }

  error(message, error = null) {
    this.log(`❌ ${message}`, colors.red);
    if (error) {
      this.log(`   Error: ${error.message}`, colors.red);
    }
    this.results.push({ status: 'error', message, error: error?.message });
    this.errors.push({ message, error });
  }

  warning(message) {
    this.log(`⚠️  ${message}`, colors.yellow);
    this.results.push({ status: 'warning', message });
  }

  info(message) {
    this.log(`ℹ️  ${message}`, colors.blue);
  }

  // Teste 1: Verificar estrutura de arquivos essenciais
  async testFileStructure() {
    this.info('Testando estrutura de arquivos...');
    
    const essentialFiles = [
      'package.json',
      'nuxt.config.ts',
      'app/pages/index.vue',
      'app/app.vue',
      'app/components/HeaderBar.vue',
      'app/components/FooterBar.vue',
      'app/components/ServicesSection.vue',
      'app/components/ContactSection.vue',
      'app/components/PaymentsSection.vue'
    ];

    for (const file of essentialFiles) {
      if (existsSync(file)) {
        this.success(`Arquivo encontrado: ${file}`);
      } else {
        this.error(`Arquivo não encontrado: ${file}`);
      }
    }
  }

  // Teste 2: Verificar dependências do package.json
  async testDependencies() {
    this.info('Verificando dependências...');
    
    try {
      const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
      
      const requiredDeps = ['nuxt', 'vue', '@nuxtjs/tailwindcss'];
      const requiredDevDeps = ['typescript', 'vue-tsc'];

      for (const dep of requiredDeps) {
        if (packageJson.dependencies?.[dep]) {
          this.success(`Dependência encontrada: ${dep}`);
        } else {
          this.error(`Dependência não encontrada: ${dep}`);
        }
      }

      for (const dep of requiredDevDeps) {
        if (packageJson.devDependencies?.[dep]) {
          this.success(`Dev dependência encontrada: ${dep}`);
        } else {
          this.warning(`Dev dependência não encontrada: ${dep}`);
        }
      }

    } catch (error) {
      this.error('Erro ao ler package.json', error);
    }
  }

  // Teste 3: Verificar configuração do Nuxt
  async testNuxtConfig() {
    this.info('Verificando configuração do Nuxt...');
    
    try {
      const configContent = readFileSync('nuxt.config.ts', 'utf8');
      
      const requiredConfigs = [
        '@nuxtjs/tailwindcss',
        'compatibilityDate',
        'modules',
        'css'
      ];

      for (const config of requiredConfigs) {
        if (configContent.includes(config)) {
          this.success(`Configuração encontrada: ${config}`);
        } else {
          this.warning(`Configuração não encontrada: ${config}`);
        }
      }

      // Verificar headers de segurança
      if (configContent.includes('X-Frame-Options')) {
        this.success('Headers de segurança configurados');
      } else {
        this.warning('Headers de segurança não encontrados');
      }

    } catch (error) {
      this.error('Erro ao ler nuxt.config.ts', error);
    }
  }

  // Teste 4: Verificar sintaxe dos componentes Vue
  async testVueComponents() {
    this.info('Verificando sintaxe dos componentes Vue...');
    
    const components = [
      'app/pages/index.vue',
      'app/components/HeaderBar.vue',
      'app/components/FooterBar.vue',
      'app/components/ServicesSection.vue'
    ];

    for (const component of components) {
      if (existsSync(component)) {
        try {
          const content = readFileSync(component, 'utf8');
          
          // Verificações básicas de sintaxe Vue
          if (content.includes('<template>') && content.includes('</template>')) {
            this.success(`Template válido: ${component}`);
          } else {
            this.error(`Template inválido: ${component}`);
          }

          if (content.includes('<script') && content.includes('</script>')) {
            this.success(`Script válido: ${component}`);
          } else {
            this.warning(`Script não encontrado: ${component}`);
          }

        } catch (error) {
          this.error(`Erro ao ler componente: ${component}`, error);
        }
      }
    }
  }

  // Teste 5: Verificar instalação de node_modules
  async testNodeModules() {
    this.info('Verificando node_modules...');
    
    if (existsSync('node_modules')) {
      this.success('node_modules existe');
      
      // Verificar módulos específicos
      const requiredModules = ['nuxt', 'vue', '@nuxtjs/tailwindcss'];
      
      for (const module of requiredModules) {
        if (existsSync(`node_modules/${module}`)) {
          this.success(`Módulo instalado: ${module}`);
        } else {
          this.error(`Módulo não instalado: ${module}`);
        }
      }
    } else {
      this.error('node_modules não encontrado - execute npm install');
    }
  }

  // Teste 6: Verificar scripts do package.json
  async testScripts() {
    this.info('Verificando scripts...');
    
    try {
      const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
      const requiredScripts = ['dev', 'build', 'generate', 'preview'];

      for (const script of requiredScripts) {
        if (packageJson.scripts?.[script]) {
          this.success(`Script encontrado: ${script}`);
        } else {
          this.error(`Script não encontrado: ${script}`);
        }
      }
    } catch (error) {
      this.error('Erro ao verificar scripts', error);
    }
  }

  // Teste 7: Verificar assets e imagens
  async testAssets() {
    this.info('Verificando assets...');
    
    const assetPaths = [
      'public/images',
      'public/favicon.ico',
      'assets/css/tailwind.css',
      'app/assets/css/theme.css'
    ];

    for (const path of assetPaths) {
      if (existsSync(path)) {
        this.success(`Asset encontrado: ${path}`);
      } else {
        this.warning(`Asset não encontrado: ${path}`);
      }
    }
  }

  // Teste 8: Verificar TypeScript
  async testTypeScript() {
    this.info('Verificando TypeScript...');
    
    try {
      // Verificar se o comando tsc está disponível
      execSync('npx tsc --version', { stdio: 'pipe' });
      this.success('TypeScript disponível');

      // Verificar tsconfig.json
      if (existsSync('tsconfig.json')) {
        this.success('tsconfig.json encontrado');
      } else {
        this.warning('tsconfig.json não encontrado');
      }

    } catch (error) {
      this.warning('TypeScript não configurado ou não disponível');
    }
  }

  // Executar todos os testes
  async runAllTests() {
    this.log(`${colors.bold}🔍 Iniciando verificação de saúde do sistema...${colors.reset}`);
    this.log('');

    await this.testFileStructure();
    this.log('');
    await this.testDependencies();
    this.log('');
    await this.testNuxtConfig();
    this.log('');
    await this.testVueComponents();
    this.log('');
    await this.testNodeModules();
    this.log('');
    await this.testScripts();
    this.log('');
    await this.testAssets();
    this.log('');
    await this.testTypeScript();
    this.log('');

    this.generateReport();
  }

  // Gerar relatório final
  generateReport() {
    const successCount = this.results.filter(r => r.status === 'success').length;
    const errorCount = this.results.filter(r => r.status === 'error').length;
    const warningCount = this.results.filter(r => r.status === 'warning').length;

    this.log(`${colors.bold}📊 RELATÓRIO FINAL${colors.reset}`);
    this.log('='.repeat(50));
    this.log(`✅ Sucessos: ${successCount}`, colors.green);
    this.log(`❌ Erros: ${errorCount}`, colors.red);
    this.log(`⚠️  Avisos: ${warningCount}`, colors.yellow);
    this.log('='.repeat(50));

    if (errorCount === 0) {
      this.log(`${colors.bold}🎉 Sistema está funcionando corretamente!${colors.reset}`, colors.green);
    } else {
      this.log(`${colors.bold}⚠️  Sistema tem ${errorCount} erro(s) que precisam ser corrigidos${colors.reset}`, colors.red);
      
      this.log('\n🔧 ERROS ENCONTRADOS:');
      this.errors.forEach((error, index) => {
        this.log(`${index + 1}. ${error.message}`, colors.red);
        if (error.error) {
          this.log(`   Detalhes: ${error.error}`, colors.red);
        }
      });
    }

    return errorCount === 0;
  }
}

// Executar se chamado diretamente
const checker = new SystemHealthChecker();
checker.runAllTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Erro:', error);
  process.exit(1);
});

export default SystemHealthChecker;