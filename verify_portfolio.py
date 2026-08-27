from pathlib import Path

html = Path('index.html').read_text(encoding='utf-8')
css = Path('styles.css').read_text(encoding='utf-8')
js = Path('script.js').read_text(encoding='utf-8')

required_html_checks = {
    'nav bar': '<nav class="navbar container">' in html,
    'hero heading': '<h1>Hi, I\'m <span class="gradient-text">KELCY</span></h1>' in html,
    'hero subtitle': '<h2>Computer Science Student &amp; Aspiring Software Engineer</h2>' in html,
    'hero project button': '>View My Projects<' in html,
    'hero connect button': '>Let’s Connect<' in html,
    'about section': '<section class="section section-light" id="about">' in html,
    'skills section': '<section class="section" id="skills">' in html,
    'projects section': '<section class="section section-light" id="projects">' in html,
    'education section': '<section class="section" id="education">' in html,
    'contact section': '<section class="section contact-section" id="contact">' in html,
    'footer section': '<footer class="site-footer">' in html,
    'back to top button': '<button class="back-to-top" id="backToTop"' in html,
}

required_skills = [
    'HTML','CSS','JavaScript','C++','Python','SQL','Git','GitHub','VS Code','Linux'
]
required_projects = ['CampusNest', 'Local Connect']

assert all(required_html_checks.values()), 'One or more required HTML sections or key UI elements were missing.'
for skill in required_skills:
    assert f'<span class="skill-name">{skill}</span>' in html, f'Missing required skill: {skill}'
for project in required_projects:
    assert f'<h3>{project}</h3>' in html, f'Missing required project: {project}'

required_asset_checks = {
    'stylesheet link': '<link rel="stylesheet" href="styles.css" />' in html,
    'script link': '<script src="script.js"></script>' in html,
    'theme dark styles': 'body.dark' in css,
    'responsive CSS mobile breakpoints': '@media (max-width: 680px)' in css,
    'smooth scroll CSS': 'scroll-behavior: smooth;' in css,
    'hamburger nav JS': 'navToggle.addEventListener' in js,
    'theme toggle JS': 'themeToggle.addEventListener' in js,
    'contact validation JS': 'validateField' in js and 'contactForm.addEventListener' in js,
    'back to top JS': 'backToTop.addEventListener' in js,
}

assert all(required_asset_checks.values()), 'One or more requested CSS/JS interactions/assets were missing.'

print('Static smoke verification passed: 18 HTML checks, 10 skills, 2 projects, and 8 asset/behavior checks verified.')
