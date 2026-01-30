import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Switch the system or browser theme to dark mode by clicking the theme toggle button and observe the page for dark mode styling.
        frame = context.pages[-1]
        # Click the theme toggle button to switch to dark mode
        elem = frame.locator('xpath=html/body/div/div/div/header/div/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Pets Almeida - Cuidado e carinho para seu pet').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pets Almeida').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Início').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Sobre').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Serviços').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pagamento').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Contato').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cuidado e carinho para seu pet').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Bem-vindo ao Pets Almeida! Somos especializados em banho, tosa e táxi dog em São Paulo. Tratamos seu pet com todo amor e profissionalismo que ele merece.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Agende Agora').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Sobre Nós').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=O Pets Almeida é referência em cuidados para pets na região do Limão, São Paulo. Com profissionais experientes e apaixonados por animais, oferecemos serviços de banho, tosa e táxi dog com qualidade e dedicação.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Nossa missão é proporcionar bem-estar e conforto para seu melhor amigo, com atendimento personalizado e todo o carinho que ele merece.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Equipe qualificada e treinada').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=TAXI').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Táxi Dog').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Transporte seguro para seu pet').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Localização').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Av. Inajar de Souza, 3823').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Limão - São Paulo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Nossos Serviços').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Dog Walker – Passeios com seu pet').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Seu doguinho precisa se exercitar, gastar energia e se divertir! Oferecemos passeios simples e interativos com duração de até 1 hora, garantindo bem‑estar, socialização e muito carinho. Ideal para quem quer ver o pet feliz mesmo com a rotina corrida.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Plano	Preço').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Passeio até 1 hora').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=A combinar').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Agendar').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Fazemos TAXI DOG').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=SOMENTE SÁBADO').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Distância	Preço').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1 a 2 km').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 10,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=2 a 4 km').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 20,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=4 a 6 km').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 40,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=6 a 10 km').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 60,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=10 a 15 km').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 80,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Táxi Pet para Consulta').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Levamos seu pet para consulta').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Hospitais').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Clínicas Veterinárias').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Consultas/Exames').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Castrações').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Banho e Tosa Higiênica').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=‹').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=›').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Porte	Preço Total').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mini').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 45,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pequeno').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 65,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Médio').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 90,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Grande').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 115,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Extra Grande').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Serviços Adicionais').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Somente Banho').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=A partir de:').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Banho Spitz - Lulu da Pomerânia').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tosa na Tesoura').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Banho Felinos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=INCLUSO CORTE DE UNHA').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tipo	Preço').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Banho a Seco - Filhote').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 60,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Banho a Seco - Adulto').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 100,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Banho Molhado - Filhote').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 80,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Banho Molhado - Adulto').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 120,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Formas de Pagamento').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cartão de Crédito').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cartão de Débito').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Taxa de maquininha: R$ 5,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pix').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=$').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Dinheiro').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Entre em Contato').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Telefone:').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+55 11 99360-2794').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=WhatsApp:').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Agendar horário').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Instagram:').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Visite nosso Instagram!').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Como Chegar').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Endereço Completo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Av. Inajar de Souza, 3916, antes do Mercadão D Àgua').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Limão, São Paulo - SP').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=CEP: 02717-000').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ver no Google Maps').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pets Almeida').nth(1)).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cuidados especiais para seu melhor amigo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Termos de Uso').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=© 2025 Pets Almeida. Todos os direitos reservados.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Desenvolvido com ❤ para pets').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Usamos cookies essenciais para melhorar sua experiência.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Aceitar').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    