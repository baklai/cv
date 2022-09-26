'use strict';

const CV_FILE_NAME = 'cv.json';

let FULL_NAME;

fetch(`./public/src/${CV_FILE_NAME}`)
  .then((res) => res.json())
  .then((data) => {
    const {
      phone,
      email,
      social,
      techSkills,
      softSkills,
      languages,
      interests,
      position,
      fullName,
      aboutMe,
      projects,
      experiences,
      courses,
      educations
    } = data;

    document.querySelector('a[href^="tel"').textContent = phone;
    document.querySelector('a[href^="tel"').href = `tel:${phone}`;

    document.querySelector('a[href^="mailto"').textContent = email;
    document.querySelector('a[href^="mailto"').href = `mailto:${email}`;

    const socialList = document.querySelector('.social-list');
    for (const key in social) {
      const element = createSocialItem({ key: key, link: social[key] });
      socialList.append(element);
    }

    const techSkillList = document.querySelector('.tech-skills-list');
    techSkills.forEach((item) => {
      const element = createTechSkillItem(item);
      techSkillList.append(element);
    });

    const softSkillList = document.querySelector('.soft-skills-list');
    softSkills.forEach((item) => {
      const element = createSoftSkillItem(item);
      softSkillList.append(element);
    });

    const languageList = document.querySelector('.language-list');
    languages.forEach((item) => {
      const element = createLanguageItem(item);
      languageList.append(element);
    });

    const interestList = document.querySelector('.interest-list');
    interests.forEach((item) => {
      const element = createInterestItem(item);
      interestList.append(element);
    });

    document.querySelector('.about-position').textContent = position;
    document.querySelector('.about-fullname').textContent = FULL_NAME =
      fullName;
    document.querySelector('.about-description').textContent = aboutMe;

    const projectsList = document.querySelector('.projects-list');
    projects.forEach((item) => {
      const element = createProjectItem(item);
      projectsList.append(element);
    });

    const experiencesList = document.querySelector('.experiences');
    experiences.forEach((item) => {
      const element = createExperienceItem(item);
      experiencesList.append(element);
    });

    const courseList = document.querySelector('.course-list');
    courses.forEach((item) => {
      const element = createCourseItem(item);
      courseList.append(element);
    });

    const educationList = document.querySelector('.education-list');
    educations.forEach((item) => {
      const element = createEducationItem(item);
      educationList.append(element);
    });
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    const templates = document.querySelectorAll('template');
    for (const template of templates) {
      template.remove();
    }

    document.body.addEventListener('keydown', function (e) {
      if (e.ctrlKey && e.code == 'KeyP') {
        e.preventDefault();
        const { width, height } = document.body.getBoundingClientRect();
        const element = document.querySelector('body');
        const option = {
          margin: 0,
          enableLinks: true,
          filename: `CV_${FULL_NAME}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, y: 10 },
          jsPDF: {
            format: [width, height],
            unit: 'px',
            orientation: 'portrait'
          }
        };
        html2pdf().set(option).from(element).save();
      }
    });
  });

function createSocialItem(item) {
  const template = document.querySelector('template#social');
  const node = template.content.cloneNode(true);
  node.querySelector('a').href = item.link;
  node.querySelector('a').title = item.key;
  node.querySelector('img').src = `./public/img/svg/${item.key}.svg`;
  node.querySelector('img').alt = item.key;
  return node;
}

function createTechSkillItem(item) {
  const template = document.querySelector('template#tech-skill');
  const node = template.content.cloneNode(true);
  node.querySelector('.tech-skills-text').textContent = item;
  return node;
}

function createSoftSkillItem(item) {
  const template = document.querySelector('template#soft-skill');
  const node = template.content.cloneNode(true);
  node.querySelector('.soft-skills-text').textContent = item;
  return node;
}

function createLanguageItem(item) {
  const template = document.querySelector('template#language');
  const node = template.content.cloneNode(true);
  node.querySelector('.language-text').textContent = item.language;
  node.querySelector('.language-subtext').textContent = ' - ' + item.level;
  return node;
}

function createInterestItem(item) {
  const template = document.querySelector('template#interest');
  const node = template.content.cloneNode(true);
  node.querySelector('.interest-text').textContent = item;
  return node;
}

function createProjectItem(item) {
  const template = document.querySelector('template#project');
  const node = template.content.cloneNode(true);
  node.querySelector('.project-link').href = item.link;
  node.querySelector('.project-link').title = item.link;
  node.querySelector('.project-link').textContent = item.name;
  node.querySelector('.project-dots').textContent = '.....';
  node.querySelector('.project-used').textContent = item.used;
  node.querySelector('.project-description').textContent = item.comment;
  return node;
}

function createExperienceItem(item) {
  const template = document.querySelector('template#experience');
  let node = template.content.cloneNode(true);
  node.querySelector('.experience-position').prepend(item.post);
  node.querySelector('.organization').textContent = item.employer;
  node.querySelector('.period').prepend(`${item.startDate} - ${item.endDate}`);
  node.querySelector('.period').append(item.address);
  const tasksList = node.querySelector('.experience-list');
  item.tasks.forEach((item) => {
    const element = createExperienceTaskItem(item);
    tasksList.append(element);
  });
  return node;
}

function createExperienceTaskItem(item) {
  const template = document.querySelector('template#experience-task');
  let node = template.content.cloneNode(true);
  node.querySelector('.experience-list-item').textContent = item;
  return node;
}

function createCourseItem(item) {
  const template = document.querySelector('template#course');
  const node = template.content.cloneNode(true);
  node.querySelector('.university').textContent = item.course;
  node.querySelector('.department').textContent = item.eduInstitution;
  node.querySelector('.period').prepend(item.endDate);
  node.querySelector('a').href = item.certificate;
  node.querySelector('a').title = item.certificate;
  return node;
}

function createEducationItem(item) {
  const template = document.querySelector('template#education');
  const node = template.content.cloneNode(true);
  node.querySelector('.university').textContent = item.eduInstitution;
  node.querySelector('.department').textContent = item.department;
  node.querySelector('.period').prepend(`${item.startDate} - ${item.endDate}`);
  node.querySelector('.period').append(item.address);
  return node;
}
