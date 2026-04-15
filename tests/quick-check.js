/**
 * Verificação Rápida do Sistema
 * Testa apenas os aspectos mais críticos
 */

import { existsSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class QuickChecker {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.successes = [];
  }

  log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
  }

  success(message) {
    this.log(`✅ ${message}`, colors.green);
    this.successes.push(message);
  }

  error(message) {
    this.log(`❌ ${message}`, colors.red);
    this.issues.push(message);
  }

  warning(message) {
    this.log(`⚠️  ${message}`, colors.yellow);
    this.warnings.push(message);
  }

  info(message) {
    this.log(`ℹ️  ${message}`, colors.blue);
  }

  async quickCheck() {
    this.log(`${colors.bold}🔍 VERIFICAÇÃO RÁPIDA DO SISTEMA${colors.reset}`);
    this.log('='.repeat(40));
    this.log('');

    // 1. Arquivos essenciais
    this.info('Verificando arquivos essenciais...');
    const essentialFiles = [
      'package.json',
      'nuxt.config.ts',
      'app/pages/index.vue',
      'app/app.vue'
    ];

    for (const file of essentialFiles) {
      if (existsSync(file)) {
        this.success(`${file} encontrado`);
      } else {
        this.error(`${file} não encontrado`);
      }
    }

    // 2. Node modules
    this.log('');
    this.info('Verificando dependências...');
    if (existsSync('node_modules')) {
      this.success('node_modules instalado');
      
      // Verificar Nuxt especificamente
      if (existsSync('node_modules/nuxt')) {
        this.success('Nuxt instalado');
      } else {
        this.error('Nuxt não instalado');
      }
    } else {
      this.error('node_modules não encontrado - execute npm install');
    }

    // 3. Teste de sintaxe básica
    this.log('');
    this.info('Verificando sintaxe básica...');
    try {
      if (existsSync('app/pages/index.vue')) {
        const indexContent = readFileSync('app/pages/index.vue', 'utf8');
        if (indexContent.includes('<template>') && indexContent.includes('</template>')) {
          this.success('Sintaxe Vue válida');
        } else {
          this.error('Sintaxe Vue inválida');
        }
      }
    } catch (error) {
      this.error('Erro ao verificar sintaxe');
    }

    // 4. Teste de build (se possível)
    this.log('');
    this.info('Testando se o projeto pode ser iniciado...');
    try {
      // Tentar verificar se o Nuxt pode ser executado
      execSync('npx nuxt --version', { stdio: 'pipe', timeout: 5000 });
      this.success('Nuxt CLI funcionando');
    } catch (error) {
      this.warning('Não foi possível verificar Nuxt CLI');
    }

    // 5. Verificar configuração básica
    this.log('');
    this.info('Verificando configuração...');
    try {
      if (existsSync('nuxt.config.ts')) {
        const config = readFileSync('nuxt.config.ts', 'utf8');
        if (config.includes('defineNuxtConfig')) {
          this.success('Configuração Nuxt válida');
        } else {
          this.error('Configuração Nuxt inválida');
        }
      }
    } catch (error) {
      this.error('Erro ao verificar configuração');
    }

    this.generateQuickReport();
  }

  generateQuickReport() {
    this.log('');
    this.log(`${colors.bold}📊 RESULTADO DA VERIFICAÇÃO RÁPIDA${colors.reset}`);
    this.log('='.repeat(40));
    
    this.log(`✅ Sucessos: ${this.successes.length}`, colors.green);
    this.log(`❌ Problemas: ${this.issues.length}`, colors.red);
    this.log(`⚠️  Avisos: ${this.warnings.length}`, colors.yellow);
    
    this.log('');

    if (this.issues.length === 0) {
      this.log(`${colors.bold}🎉 Sistema parece estar funcionando!${colors.reset}`, colors.green);
      this.log(`${colors.green}Você pode tentar executar: npm run dev${colors.reset}`);
    } else {
      this.log(`${colors.bold}⚠️  Problemas encontrados:${colors.reset}`, colors.red);
      this.issues.forEach((issue, index) => {
        this.log(`${index + 1}. ${issue}`, colors.red);
      });
      
      this.log('');
      this.log(`${colors.yellow}Sugestões:${colors.reset}`);
      if (this.issues.some(i => i.includes('node_modules'))) {
        this.log(`- Execute: npm install`);
      }
      if (this.issues.some(i => i.includes('não encontrado'))) {
        this.log(`- Verifique se está no diretório correto`);
      }
    }

    this.log('');
    this.log(`${colors.blue}Para verificação completa, execute: npm run test${colors.reset}`);
    
    return this.issues.length === 0;
  }
}

// Executar se chamado diretamente
const checker = new QuickChecker();
checker.quickCheck().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Erro:', error);
  process.exit(1);
});

export default QuickChecker;