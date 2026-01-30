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
        # -> Check that the favicon is correctly linked and loads on the page.
        await page.goto('http://localhost:3000/favicon.ico', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Check that the robots.txt file is present and accessible at the root URL.
        await page.goto('http://localhost:3000/robots.txt', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Check HTTP response headers for essential security headers related to SEO and security.
        await page.goto('http://localhost:3000', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Pets Almeida - Cuidado e carinho para seu pet').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Bem-vindo ao Pets Almeida! Somos especializados em banho, tosa e táxi dog em São Paulo. Tratamos seu pet com todo amor e profissionalismo que ele merece.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Referência em cuidados para pets na região do Limão, São Paulo. Com profissionais experientes e apaixonados por animais, oferecemos serviços de banho, tosa e táxi dog com qualidade e dedicação.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Av. Inajar de Souza, 3823 Limão - São Paulo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Equipe qualificada e treinada').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Passeios simples e interativos com duração de até 1 hora, garantindo bem‑estar, socialização e muito carinho. Ideal para quem quer ver o pet feliz mesmo com a rotina corrida.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Fazemos TAXI DOG').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Levamos seu pet para consulta').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Banho e tosa higiênica').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Somente Banho').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Banho Spitz - Lulu da Pomerânia').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tosa na Tesoura').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Banho Felinos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tosa Padrão').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tosa Zero').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cartão de Crédito').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cartão de Débito').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pix').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Dinheiro').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Taxa de maquininha: R$ 5,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+55 11 99360-2794').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Agendar horário').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Visite nosso Instagram!').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Av. Inajar de Souza, 3916, antes do Mercadão D Àgua').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Limão, São Paulo - SP').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=CEP: 02717-000').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ver no Google Maps').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=© 2025 Pets Almeida. Todos os direitos reservados.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Desenvolvido com ❤ para pets').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    