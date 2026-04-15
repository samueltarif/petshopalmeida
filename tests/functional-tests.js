/**
 * Testes Funcionais da Aplicação
 * Testa funcionalidades específicas do negócio
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class FunctionalTester {
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

  // Teste 1: Verificar estrutura de navegação
  async testNavigation() {
    this.info('Testando estrutura de navegação...');
    
    try {
      const indexContent = readFileSync('app/pages/index.vue', 'utf8');
      
      // Verificar se os itens de navegação estão definidos
      if (indexContent.includes('navItems')) {
        this.success('Itens de navegação definidos');
        
        // Verificar seções específicas
        const sections = ['#home', '#sobre', '#servicos', '#pagamento', '#contato'];
        for (const section of sections) {
          if (indexContent.includes(section)) {
            this.success(`Seção encontrada: ${section}`);
          } else {
            this.error(`Seção não encontrada: ${section}`);
          }
        }
      } else {
        this.error('Itens de navegação não definidos');
      }

    } catch (error) {
      this.error('Erro ao verificar navegação', error);
    }
  }

  // Teste 2: Verificar componentes de serviços
  async testServices() {
    this.info('Testando componentes de serviços...');
    
    try {
      if (existsSync('app/components/ServicesSection.vue')) {
        const servicesContent = readFileSync('app/components/ServicesSection.vue', 'utf8');
        this.success('Componente ServicesSection encontrado');
        
        // Verificar se há serviços definidos
        if (servicesContent.includes('service-card') || servicesContent.includes('ServiceCard')) {
          this.success('Cards de serviços implementados');
        } else {
          this.warning('Cards de serviços não encontrados');
        }
      } else {
        this.error('Componente ServicesSection não encontrado');
      }

      // Verificar componentes de serviços específicos
      const serviceComponents = [
        'app/components/services/ServiceBanhoFelinos.vue',
        'app/components/services/ServiceTosaPadrao.vue',
        'app/components/services/ServiceTaxiDog.vue'
      ];

      for (const component of serviceComponents) {
        if (existsSync(component)) {
          this.success(`Componente de serviço encontrado: ${component.split('/').pop()}`);
        } else {
          this.warning(`Componente de serviço não encontrado: ${component.split('/').pop()}`);
        }
      }

    } catch (error) {
      this.error('Erro ao verificar serviços', error);
    }
  }

  // Teste 3: Verificar informações de contato
  async testContact() {
    this.info('Testando informações de contato...');
    
    try {
      if (existsSync('app/components/ContactSection.vue')) {
        const contactContent = readFileSync('app/components/ContactSection.vue', 'utf8');
        this.success('Componente ContactSection encontrado');
        
        // Verificar informações essenciais
        const contactInfo = [
          'whatsapp',
          'telefone',
          'endereço',
          'Cachoeirinha',
          'São Paulo'
        ];

        for (const info of contactInfo) {
          if (contactContent.toLowerCase().includes(info.toLowerCase())) {
            this.success(`Informação de contato encontrada: ${info}`);
          } else {
            this.warning(`Informação de contato não encontrada: ${info}`);
          }
        }
      } else {
        this.error('Componente ContactSection não encontrado');
      }

    } catch (error) {
      this.error('Erro ao verificar contato', error);
    }
  }

  // Teste 4: Verificar páginas de bairros
  async testNeighborhoodPages() {
    this.info('Testando páginas de bairros...');
    
    const neighborhoods = [
      'app/pages/bairro/cachoeirinha.vue',
      'app/pages/bairro/brasilandia.vue',
      'app/pages/bairro/casa-verde.vue',
      'app/pages/bairro/limao.vue',
      'app/pages/bairro/vila-penteado.vue'
    ];

    for (const page of neighborhoods) {
      if (existsSync(page)) {
        this.success(`Página de bairro encontrada: ${page.split('/').pop()}`);
        
        try {
          const content = readFileSync(page, 'utf8');
          
          // Verificar se tem conteúdo específico do bairro
          if (content.includes('title') || content.includes('meta')) {
            this.success(`SEO configurado para: ${page.split('/').pop()}`);
          } else {
            this.warning(`SEO não configurado para: ${page.split('/').pop()}`);
          }
        } catch (error) {
          this.error(`Erro ao ler página: ${page}`, error);
        }
      } else {
        this.warning(`Página de bairro não encontrada: ${page.split('/').pop()}`);
      }
    }
  }

  // Teste 5: Verificar imagens e assets
  async testImages() {
    this.info('Testando imagens e assets...');
    
    try {
      const imageDir = 'public/images';
      if (existsSync(imageDir)) {
        this.success('Diretório de imagens encontrado');
        
        // Verificar imagens específicas mencionadas no código
        const requiredImages = [
          'foto_capa.png',
          'dog.jpg'
        ];

        for (const image of requiredImages) {
          if (existsSync(`${imageDir}/${image}`)) {
            this.success(`Imagem encontrada: ${image}`);
          } else {
            this.warning(`Imagem não encontrada: ${image}`);
          }
        }
      } else {
        this.error('Diretório de imagens não encontrado');
      }

      // Verificar favicon
      if (existsSync('public/favicon.ico')) {
        this.success('Favicon encontrado');
      } else {
        this.warning('Favicon não encontrado');
      }

    } catch (error) {
      this.error('Erro ao verificar imagens', error);
    }
  }

  // Teste 6: Verificar SEO e meta tags
  async testSEO() {
    this.info('Testando configurações de SEO...');
    
    try {
      const indexContent = readFileSync('app/pages/index.vue', 'utf8');
      
      // Verificar useHead
      if (indexContent.includes('useHead')) {
        this.success('useHead configurado');
        
        // Verificar elementos SEO específicos
        const seoElements = ['title', 'description', 'viewport'];
        for (const element of seoElements) {
          if (indexContent.includes(element)) {
            this.success(`Meta tag encontrada: ${element}`);
          } else {
            this.warning(`Meta tag não encontrada: ${element}`);
          }
        }
      } else {
        this.error('useHead não configurado');
      }

      // Verificar LocalBusinessSchema
      if (indexContent.includes('LocalBusinessSchema')) {
        this.success('Schema de negócio local implementado');
      } else {
        this.warning('Schema de negócio local não encontrado');
      }

    } catch (error) {
      this.error('Erro ao verificar SEO', error);
    }
  }

  // Teste 7: Verificar responsividade
  async testResponsiveness() {
    this.info('Testando configurações de responsividade...');
    
    try {
      const indexContent = readFileSync('app/pages/index.vue', 'utf8');
      
      // Verificar media queries
      if (indexContent.includes('@media')) {
        this.success('Media queries implementadas');
        
        // Verificar breakpoints específicos
        const breakpoints = ['768px', '480px'];
        for (const bp of breakpoints) {
          if (indexContent.includes(bp)) {
            this.success(`Breakpoint encontrado: ${bp}`);
          } else {
            this.warning(`Breakpoint não encontrado: ${bp}`);
          }
        }
      } else {
        this.warning('Media queries não encontradas');
      }

      // Verificar classes responsivas do Tailwind
      if (indexContent.includes('clamp(') || indexContent.includes('md:') || indexContent.includes('lg:')) {
        this.success('Classes responsivas implementadas');
      } else {
        this.warning('Classes responsivas não encontradas');
      }

    } catch (error) {
      this.error('Erro ao verificar responsividade', error);
    }
  }

  // Teste 8: Verificar funcionalidades JavaScript
  async testJavaScriptFeatures() {
    this.info('Testando funcionalidades JavaScript...');
    
    try {
      const indexContent = readFileSync('app/pages/index.vue', 'utf8');
      
      // Verificar composables Vue 3
      const composables = ['ref', 'onMounted', 'useHead'];
      for (const composable of composables) {
        if (indexContent.includes(composable)) {
          this.success(`Composable encontrado: ${composable}`);
        } else {
          this.warning(`Composable não encontrado: ${composable}`);
        }
      }

      // Verificar funcionalidades específicas
      if (indexContent.includes('scrollToContact')) {
        this.success('Função de scroll implementada');
      } else {
        this.warning('Função de scroll não encontrada');
      }

      if (indexContent.includes('IntersectionObserver')) {
        this.success('Animações de scroll implementadas');
      } else {
        this.warning('Animações de scroll não encontradas');
      }

    } catch (error) {
      this.error('Erro ao verificar JavaScript', error);
    }
  }

  // Executar todos os testes funcionais
  async runAllTests() {
    this.log(`${colors.bold}🧪 Iniciando testes funcionais...${colors.reset}`);
    this.log('');

    await this.testNavigation();
    this.log('');
    await this.testServices();
    this.log('');
    await this.testContact();
    this.log('');
    await this.testNeighborhoodPages();
    this.log('');
    await this.testImages();
    this.log('');
    await this.testSEO();
    this.log('');
    await this.testResponsiveness();
    this.log('');
    await this.testJavaScriptFeatures();
    this.log('');

    this.generateReport();
  }

  // Gerar relatório final
  generateReport() {
    const successCount = this.results.filter(r => r.status === 'success').length;
    const errorCount = this.results.filter(r => r.status === 'error').length;
    const warningCount = this.results.filter(r => r.status === 'warning').length;

    this.log(`${colors.bold}📊 RELATÓRIO DE TESTES FUNCIONAIS${colors.reset}`);
    this.log('='.repeat(50));
    this.log(`✅ Sucessos: ${successCount}`, colors.green);
    this.log(`❌ Erros: ${errorCount}`, colors.red);
    this.log(`⚠️  Avisos: ${warningCount}`, colors.yellow);
    this.log('='.repeat(50));

    if (errorCount === 0) {
      this.log(`${colors.bold}🎉 Todas as funcionalidades estão implementadas!${colors.reset}`, colors.green);
    } else {
      this.log(`${colors.bold}⚠️  ${errorCount} funcionalidade(s) precisam ser implementadas${colors.reset}`, colors.red);
      
      this.log('\n🔧 FUNCIONALIDADES FALTANDO:');
      this.errors.forEach((error, index) => {
        this.log(`${index + 1}. ${error.message}`, colors.red);
      });
    }

    return errorCount === 0;
  }
}

// Executar se chamado diretamente
const tester = new FunctionalTester();
tester.runAllTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Erro:', error);
  process.exit(1);
});

export default FunctionalTester;