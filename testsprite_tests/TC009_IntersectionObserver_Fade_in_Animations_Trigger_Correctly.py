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
        # -> Scroll slowly through the landing page to observe fade-in animations on service cards and highlighted features.
        await page.mouse.wheel(0, 300)
        

        # -> Continue scrolling slowly and observe if service cards and highlighted features fade in smoothly as they enter the viewport, and confirm no animations trigger before visibility.
        await page.mouse.wheel(0, 300)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Passeios simples e interativos de até 1 hora para exercitar e socializar seu pet.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Transporte seguro para seu pet, disponível somente aos sábados.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Transporte para consultas, exames, castrações em hospitais e clínicas veterinárias.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 45,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=R$ 10,00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cartão de Crédito').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+55 11 99360-2794').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    