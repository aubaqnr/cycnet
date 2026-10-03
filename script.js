
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');
if(menuBtn && nav){
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.addEventListener('click',()=>{
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
}
if(nav){
  document.querySelectorAll('.nav-links a').forEach(link=>{
    link.addEventListener('click',()=>{
      nav.classList.remove('open');
      if(menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const contactModal = document.createElement('div');
contactModal.className = 'contact-modal';
contactModal.setAttribute('aria-hidden', 'true');
contactModal.innerHTML = `
  <div class="contact-modal__backdrop" data-contact-close></div>
  <section class="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title">
    <button class="contact-dialog__close" type="button" aria-label="Close contact form" data-contact-close>&times;</button>
    <p class="contact-dialog__eyebrow">CYCNET</p>
    <h2 id="contact-title">Get in touch</h2>
    <p>Send us a message. If your email app does not open, you can copy the message and email it to us.</p>
    <form class="contact-form" novalidate>
      <label>Name<input name="name" type="text" autocomplete="name" required></label>
      <label>Email<input name="email" type="email" autocomplete="email" required></label>
      <label>Message<textarea name="message" rows="5" required></textarea></label>
      <p class="contact-form__status" aria-live="polite"></p>
      <button class="btn btn-primary" type="submit">Continue</button>
    </form>
    <div class="contact-form__result" hidden>
      <p class="contact-form__result-status" aria-live="polite"></p>
      <p class="contact-form__recipient">Send to <a href="mailto:cycnet@sdu.edu.kz">cycnet@sdu.edu.kz</a></p>
      <label class="contact-form__message-label">Your message<textarea data-contact-message rows="7" readonly></textarea></label>
      <div class="contact-form__actions">
        <a class="btn btn-primary" data-contact-send>Email via app</a>
        <button class="btn btn-secondary" type="button" data-contact-copy>Copy message</button>
        <button class="contact-form__edit" type="button" data-contact-edit>Back to form</button>
      </div>
    </div>
  </section>`;
document.body.append(contactModal);

const contactForm = contactModal.querySelector('.contact-form');
const contactStatus = contactModal.querySelector('.contact-form__status');
const contactResult = contactModal.querySelector('.contact-form__result');
const contactResultStatus = contactModal.querySelector('.contact-form__result-status');
const contactMessage = contactModal.querySelector('[data-contact-message]');
const contactSend = contactModal.querySelector('[data-contact-send]');
let lastFocusedElement;

function closeContactModal(){
  contactModal.classList.remove('is-open');
  contactModal.setAttribute('aria-hidden', 'true');
  if(lastFocusedElement) lastFocusedElement.focus();
}

function openContactModal(trigger){
  lastFocusedElement = trigger;
  contactModal.classList.add('is-open');
  contactModal.setAttribute('aria-hidden', 'false');
  contactModal.querySelector('input[name="name"]').focus();
}

document.querySelectorAll('[data-contact-trigger]').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    openContactModal(trigger);
  });
});

contactModal.querySelectorAll('[data-contact-close]').forEach(button => {
  button.addEventListener('click', closeContactModal);
});

document.addEventListener('keydown', event => {
  if(event.key === 'Escape' && contactModal.classList.contains('is-open')) closeContactModal();
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  contactStatus.textContent = '';
  if(!contactForm.checkValidity()){
    contactStatus.textContent = 'Please complete all fields with a valid email address.';
    contactForm.reportValidity();
    return;
  }

  const data = new FormData(contactForm);
  const subject = `CYCNET enquiry from ${data.get('name')}`;
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\nMessage:\n${data.get('message')}`;
  contactMessage.value = body;
  contactSend.href = `mailto:cycnet@sdu.edu.kz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  contactForm.hidden = true;
  contactResult.hidden = false;
  contactResultStatus.textContent = 'Your message is ready. Choose an option below to send it.';
  contactSend.focus();
});

contactModal.querySelector('[data-contact-copy]').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(contactMessage.value);
    contactResultStatus.textContent = 'Message copied. Paste it into an email to cycnet@sdu.edu.kz.';
  } catch {
    contactMessage.focus();
    contactMessage.select();
    contactMessage.setSelectionRange(0, contactMessage.value.length);
    const copied = document.execCommand('copy');
    contactResultStatus.textContent = copied
      ? 'Message copied. Paste it into an email to cycnet@sdu.edu.kz.'
      : 'Copy the selected message and email it to cycnet@sdu.edu.kz.';
  }
});

contactModal.querySelector('[data-contact-edit]').addEventListener('click', () => {
  contactResult.hidden = true;
  contactForm.hidden = false;
  contactStatus.textContent = '';
  contactForm.querySelector('input[name="name"]').focus();
});

const eventDetails = {
  'cybersecurity-day': { gallery: ['cybersecurity-day-2026-1.jpg', 'cybersecurity-day-2026-2.jpg', 'cybersecurity-day-2026-3.jpg'], title: 'Cybersecurity Day 2026', meta: '2026 · CYBERSECURITY', partners: 'Fortinet, Cloud24.kz', copy: [
    'Cybersecurity Day is a large-scale cybersecurity event organized at SDU University in collaboration with Fortinet and Cloud24.kz, bringing together students, cybersecurity professionals, and technology experts to discuss modern approaches to protecting digital infrastructure.',
    'The full-day event gathered more than 400 students from universities across Kazakhstan and Kyrgyzstan and focused on practical cybersecurity knowledge, enterprise security technologies, and real-world industry practices. The program included technical sessions from cybersecurity experts covering modern threat landscapes, network security, enterprise protection strategies, and the role of security technologies in protecting digital environments.',
    'In addition to expert talks, the event featured interactive demo stands and practical activities where participants could explore cybersecurity solutions, work with security technologies, and gain hands-on experience with approaches used in real organizations. This practical format allowed students to connect theoretical concepts with real-world cybersecurity workflows.',
    'A significant milestone of the event was the signing of a Memorandum of Understanding between SDU University and Cloud24.kz, strengthening cooperation between academia and industry and creating new opportunities for students in cybersecurity education, technology development, and professional growth.',
  ]},
  'soc-simulation': { gallery: ['soc-simulation-2026-1.jpg', 'soc-simulation-2026-2.jpg', 'soc-simulation-2026-3.jpg'], title: 'SOC Simulation Challenge 2026', meta: '2026 · CYBERSECURITY', partners: 'TryHackMe SOC Simulator', copy: [
    'SOC Simulation Challenge is a practical cybersecurity competition organized at SDU University, designed to simulate the workflow of a Security Operations Center (SOC) team and provide students with hands-on experience in security monitoring, threat analysis, and incident response.',
    'The challenge places participants in realistic cybersecurity scenarios where they analyze security alerts, investigate suspicious activities, identify potential threats, and make response decisions based on simulated incidents. The competition is built around the TryHackMe SOC Simulator platform, allowing participants to experience SOC analyst workflows, including log analysis, alert investigation, threat detection, and incident handling processes.',
    "The event focuses on developing practical defensive cybersecurity skills and improving students' understanding of real-world security operations. Participants gain experience with SOC methodologies, security event analysis, incident response procedures, and the decision-making process required during cyber incidents.",
  ]},
  freedom: { gallery: ['freedom-juniors-day-2026-1.jpg', 'freedom-juniors-day-2026-2.jpg', 'freedom-juniors-day-2026-3.jpg'], title: "Freedom Junior's Day 2026", meta: '2026 · CYBERSECURITY', partners: 'Freedom Holding Corp.', copy: [
    "Freedom Junior's Day is an industry-focused educational event organized at SDU University in collaboration with Freedom Holding Corp., aimed at connecting students with cybersecurity and data professionals working in large-scale technology environments.",
    'The event brings together industry experts and university students to explore modern cybersecurity challenges, secure system design, and the operational realities of protecting digital services used by millions of users. The program features technical talks from security specialists at Freedom Holding Corp., who share real-world experience in areas such as secure feature implementation, data protection governance, Blue Team operations, and the evolving role of artificial intelligence in cybersecurity.',
    'The meetup is structured as a practical industry knowledge exchange, where speakers present real cases from enterprise environments and discuss how modern organizations approach infrastructure security, incident response, and data protection at scale. Topics covered include secure software development in large platforms, the responsibilities of a Data Protection Officer (DPO), modern threat detection approaches from a Blue Team perspective, and emerging risks associated with AI adoption in enterprise environments. The event contributes to strengthening the cybersecurity ecosystem within the university while helping students better understand real industry workflows, career paths, and technical expectations.',
  ]},
  narxoz: { gallery: ['narxoz-ctf-2026-1.jpg', 'narxoz-ctf-2026-2.jpg', 'narxoz-ctf-2026-3.jpg'], title: 'Narxoz CTF 2026', meta: '2026 · CTF · CYBERSECURITY', partners: 'TryHackMe, XNET, Azimut Solutions; Fortinet', copy: [
    'Narxoz CTF is an offline cybersecurity competition organized at Narxoz University in collaboration with the CYCNET Community. The event is designed to provide students with hands-on experience in solving real-world cybersecurity challenges through a Capture The Flag (CTF) competition in Jeopardy format.',
    'The competition brings together students and aspiring cybersecurity professionals to test their technical skills across multiple domains, including web exploitation, cryptography, digital forensics, steganography, network analysis, OSINT, and miscellaneous security challenges. Participants work in teams to solve tasks that simulate realistic attack and defense scenarios, encouraging analytical thinking, teamwork, and practical problem-solving. In addition to classic CTF challenges, participants also worked with enterprise security technologies by configuring elements of the Fortinet Security Fabric, simulating the protection of a modern enterprise network environment using AI-powered security capabilities. This allowed students to gain exposure not only to offensive security techniques but also to defensive infrastructure concepts used in real organizations.',
    'The competition gathered 20 teams and more than 50 students, creating a competitive environment where participants demonstrated their technical knowledge, problem-solving abilities, and teamwork under time constraints.',
  ]},
  'security-day': { gallery: ['sdu-ctf-2026-1.jpg', 'sdu-ctf-2026-2.jpg', 'sdu-ctf-2026-3.jpg'], title: 'Security Day 2024, 2025 & SDU CTF 2026', meta: '2024—2026 · CTF · CYBERSECURITY', partners: 'TryHackMe, CyberQupiya.kz, Fortinet; SDU CTF: TryHackMe, Cloudflare, Marvel Kazakhstan', copy: [
    'Security Day 2024, 2025 & SDU CTF 2026 is an annual flagship cybersecurity competition held at SDU University, designed to identify and develop technical talent through a hands-on Capture The Flag competition in Jeopardy format. The event focuses exclusively on practical cybersecurity challenges, where participants solve real-world tasks simulating attack and defense scenarios across multiple domains.',
    'SDU CTF 2026 builds upon previous large-scale initiatives such as Security Week 2023, Security Day 2024, and Security Day 2025, which collectively engaged over 500+ students and established a strong foundation for hands-on cybersecurity education within the university ecosystem. SDU CTF represents the next stage in scaling these initiatives into a focused, competitive, and technically intensive format.',
    'The competition consists of two stages: an online qualification round and an offline final held at SDU University cybersecurity laboratories. The event gathers more than 100 participants annually, fostering a highly competitive environment where students demonstrate their skills in ethical hacking, digital forensics, web security, reverse engineering, and infrastructure security.',
  ]},
  aws: { gallery: ['aws-student-day-2025-1.jpg', 'aws-student-day-2025-2.jpg', 'aws-student-day-2025-3.jpg'], title: 'AWS Student Day 2025', meta: '2025 · CLOUD', partners: 'AWS community, qCloudy', copy: [
    'AWS Student Day is a large-scale educational event dedicated to cloud technologies, DevOps practices, and modern AI infrastructure, organized at SDU University in collaboration with the AWS community and qCloudy. The event is designed to introduce students to the fundamentals of cloud computing and demonstrate how modern organizations build scalable and resilient systems using Amazon Web Services.',
    'The conference brings together cloud engineers, developer advocates, and industry professionals who share practical experience in cloud architecture, DevOps culture, and artificial intelligence technologies built on AWS infrastructure. The program focuses on bridging the gap between theoretical knowledge and real-world cloud engineering practices.',
    'During the event, speakers from the AWS community and industry partners presented practical insights into cloud adoption, DevOps workflows, and modern AI applications powered by AWS services. Topics included the value of cloud technologies in modern software development, AI integration using AWS infrastructure, and practical career pathways for students who want to start working with cloud technologies. The event also included a hands-on technical workshop where participants deployed and experimented with AWS services in a practical environment, allowing students to gain direct experience with cloud platforms and infrastructure tools. AWS Student Day gathered more than 300 participants from universities across Kazakhstan and Kyrgyzstan, making it one of the largest student-focused cloud technology events held at SDU University. The event provided a platform for students to interact directly with industry professionals, learn about real-world cloud engineering workflows, and explore career opportunities in cloud computing and DevOps.',
  ]},
  'security-week': { gallery: ['security-week-2023-1.jpg', 'security-week-2023-2.jpg', 'security-week-2023-3.jpg'], title: 'Security Week 2023', meta: '2023 · CYBERSECURITY', partners: 'Companies, academies, faculty members, IT law professionals and vendors', copy: [
    'Security Week is a comprehensive week-long event designed to enhance cybersecurity literacy among IT students, featuring lectures, quizzes, and quests focused on various cybersecurity topics, culminating in an IT Law Forum. Participants engage in practical tasks, networking opportunities, and competitions to foster interest and identify standout talents in the cybersecurity field.',
  ]},
  netday: { gallery: ['netday-2022-2023-1.jpg', 'netday-2022-2023-2.jpg', 'netday-2022-2023-3.jpg'], title: 'NetDay 2022, 2023', meta: '2022—2023 · NETWORKING · CYBERSECURITY · LINUX', partners: 'Cisco, RedHat, Fortinet, JK Partners, TechGarden, Marvel Kazakhstan, NTET, Azimut Solutions', copy: [
    'Netday is an annual flagship event designed to inspire and empower the next generation of Computer Networks, Cybersecurity, and Linux Administration enthusiasts. This dynamic and knowledge-intensive event spans across 2-3 days, offering a platform for students and postgraduates to showcase their talents and passion for the world of computer networks and cybersecurity.',
    'The evolution of this significant event began in 2019 with the inaugural "Cisco Day" organized exclusively for SDU students. By the subsequent year, 2020, the momentum intensified as the event transitioned into the "Cisco NetAcad Hackathon," garnering substantial support from Cisco Kazakhstan and witnessing active participation from over 100 students spanning Central Asia.',
    'Navigating the unprecedented challenges posed by the global pandemic in 2021, the event persisted, albeit in a virtual avatar, maintaining its commitment to engaging students within the university in an online format.',
    'The transformative year of 2022 heralded a pivotal rebranding, culminating in the birth of "NetDay." This enhanced version seamlessly incorporated new dimensions like cybersecurity and Linux administration, resonating with a broader audience. The event witnessed an overwhelming response with 25 participants hailing from Kyrgyzstan and an astounding 392 from Kazakhstan, representing a diverse cohort of 395 university students, 13 college participants, and 9 school attendees. Notably, students from SDU, AUPET, and MUIT universities showcased their prowess by clinching prize-winning positions, solidifying "NetDay" as a beacon of excellence in IT education and networking.',
    "As the legacy continued into 2023, the event's prominence further escalated, attracting a formidable registration of over 250 students from Central Asia. This edition witnessed a broader spectrum of excellence, with students from esteemed institutions like Alatoo, KBTU, AUPET, and ATU distinguishing themselves by securing coveted prize places, underscoring the event's regional significance and impact on nurturing future IT leaders.",
  ]}
};

const eventModal = document.createElement('div');
eventModal.className = 'event-modal';
eventModal.setAttribute('aria-hidden', 'true');
eventModal.innerHTML = '<div class="event-modal__backdrop" data-event-close></div><section class="event-dialog" role="dialog" aria-modal="true" aria-labelledby="event-title"><button class="event-dialog__close" type="button" aria-label="Close event details" data-event-close>&times;</button><div class="event-dialog__gallery" aria-label="Event photo gallery"></div><p class="event-dialog__meta"></p><h2 id="event-title"></h2><div class="event-dialog__copy"></div><p class="event-dialog__partners" hidden><strong>Partners:</strong> <span></span></p></section>';
document.body.append(eventModal);
let lastEventTrigger;
function closeEventModal(){ eventModal.classList.remove('is-open'); eventModal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); if(lastEventTrigger) lastEventTrigger.focus(); }
function openEventModal(trigger){
  const item = eventDetails[trigger.dataset.event]; if(!item) return;
  lastEventTrigger = trigger; eventModal.querySelector('.event-dialog__meta').textContent = item.meta; eventModal.querySelector('#event-title').textContent = item.title;
  const gallery = eventModal.querySelector('.event-dialog__gallery');
  gallery.replaceChildren(...item.gallery.map((filename, index) => { const image = document.createElement('img'); image.src = 'assets/events/' + filename; image.alt = item.title + ' - Image ' + (index + 1); image.loading = 'lazy'; return image; }));
  const copy = eventModal.querySelector('.event-dialog__copy'); copy.replaceChildren(...item.copy.map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
  const partners = eventModal.querySelector('.event-dialog__partners'); partners.hidden = !item.partners; partners.querySelector('span').textContent = item.partners || '';
  eventModal.classList.add('is-open'); eventModal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); eventModal.querySelector('.event-dialog__close').focus();
}
document.querySelectorAll('[data-event-open]').forEach(button => button.addEventListener('click', () => openEventModal(button)));
eventModal.querySelectorAll('[data-event-close]').forEach(button => button.addEventListener('click', closeEventModal));
document.addEventListener('keydown', event => { if(event.key === 'Escape' && eventModal.classList.contains('is-open')) closeEventModal(); });
document.querySelectorAll('.event-filters button').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter; document.querySelectorAll('.event-filters button').forEach(item => item.classList.toggle('is-active', item === button));
  let visible = 0; document.querySelectorAll('.event-card').forEach(card => { const show = filter === 'all' || card.dataset.tags.split(' ').includes(filter); card.hidden = !show; if(show) visible++; });
  const empty = document.querySelector('.events-empty'); if(empty) empty.hidden = visible !== 0;
}));
