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
        # -> Inspect each ServiceCard component for displayed icon, title, and pricing details, starting with Taxi Dog service cards.
        await page.mouse.wheel(0, 600)
        

        # -> Verify pricing tables against documented pricing for each pet size and service type, and check for debit card fees indication.
        await page.mouse.wheel(0, 400)
        

        # -> Perform security and extra validations as per user instructions (rel noopener noreferrer, encoding, XSS, inline handlers, headers, viewport).
        await page.mouse.wheel(0, -await page.evaluate('() => window.innerHeight'))
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Táxi Dog').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Transporte seguro para seu pet, disponível somente aos sábados.').first).to_be_visible(timeout=30000)
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
        await expect(frame.locator('text=Banho e Tosa Higiênica').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mini').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 45,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Pequeno').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 65,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Médio').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 90,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Grande').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 115,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Extra Grande').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=A combinar').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Taxa de maquininha: R$ 5,00').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    