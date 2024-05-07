let resumes = [];
let currentResumeIndex = 0;

// Function to fetch data from JSON file
document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

async function fetchData() {
    try {
        let response = await fetch('Data.json');
        let data = await response.json();
        resumes = data.resume;
        displayResume(currentResumeIndex);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Funtion to display the fetchData from JSON into User readable format
function displayResume(index) {
    let resume = resumes[index];

    document.getElementById('name').textContent = resume.basics.name;
    document.getElementById('applied').textContent = `Applied for: ${resume.basics.AppliedFor}`;

    document.getElementById('email').textContent = `Email: ${resume.basics.email}`;
    document.getElementById('phone').textContent = `Phone: ${resume.basics.phone}`;
    document.getElementById('social').textContent = resume.basics.profiles.url;

    let technicalSkillsList = document.getElementById('technicalSkills');
    technicalSkillsList.innerHTML = resume.skills.keywords.map(skill => `<li>${skill}</li>`).join('');

    let hobbiesList = document.getElementById('hobbies');
    hobbiesList.innerHTML = resume.interests.hobbies.map(hobby => `<li>${hobby}</li>`).join('');

    document.getElementById('position').textContent = `${resume.work.CompanyName} - ${resume.work.Position} (${resume.work.StartDate} to ${resume.work.EndDate})`;
    document.getElementById('duration').textContent = resume.work.Summary;

    let projectsList = document.getElementById('projects');
    projectsList.innerHTML = `<li>${resume.projects.name}: ${resume.projects.description}</li>`;

    let educationList = document.getElementById('education');
    educationList.innerHTML = `<li>${resume.education.UG.institute} - ${resume.education.UG.course} (${resume.education.UG.StartDate} to ${resume.education.UG.EndDate}), CGPA: ${resume.education.UG.cgpa}</li>`;

    if (resume.Internship) {
        let internshipsList = document.getElementById('internships');
        internshipsList.innerHTML = `<li>${resume.Internship.CompanyName} - ${resume.Internship.Position} (${resume.Internship.StartDate} to ${resume.Internship.EndDate}): ${resume.Internship.Summary}</li>`;
    }

    let achievementsList = document.getElementById('achievements');
    achievementsList.innerHTML = resume.achievements.Summary.map(achievement => `<li>${achievement}</li>`).join('');
}

// Funtion to perform go back to prevResume
function prevResume() {
    if (currentResumeIndex > 0) {
        currentResumeIndex--;
        displayResume(currentResumeIndex);
    }
    else {
        alert('You are already in the 1st Resume, there is no resume to go previous..');
    }
    updateButtonVisibility();
}

// Funtion to perform go Next to prevResume
function nextResume() {
    if (currentResumeIndex < resumes.length - 1) {
        currentResumeIndex++;
        displayResume(currentResumeIndex);
    }
    else {
        alert('No other Resume to go..');
    }
    updateButtonVisibility();
}

function updateButtonVisibility() {

    let prevButton = document.getElementById('prevButton');
    let nextButton = document.getElementById('nextButton');

    // Hide both buttons if there's only one application
    if (resumes.length === 1) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        return;
    }

    // Hide previous button if shown application is the first one
    if (currentResumeIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'inline-block';
    }

    // Hide next button if shown application is the last one
    if (currentResumeIndex === resumes.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'inline-block';
    }
}

// Funtion for Filter resumes based on the job title / applied for
function searchResumes() {

    let searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    let matchingResumes = resumes.filter(resume => resume.basics.AppliedFor.toLowerCase().includes(searchTerm));

    if (matchingResumes.length > 0) {
        resumes = matchingResumes;
        currentResumeIndex = 0;
        displayResume(currentResumeIndex);
        updateButtonVisibility();
    } else {
        // Show an error page if no matching resumes found
        var newUrl = "./nosearchresult.html";
        window.location.replace(newUrl);
    }
}

// Display the first resume initially
displayResume(currentResumeIndex);
updateButtonVisibility();
