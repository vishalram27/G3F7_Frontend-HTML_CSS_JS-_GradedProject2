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

    document.getElementById('email').innerHTML = `<ul><li><strong>Email: </strong>${resume.basics.email}</li></ul>`;
    document.getElementById('phone').innerHTML = `<ul><li><strong>Phone: </strong>${resume.basics.phone}</li></ul>`;
    document.getElementById('social').innerHTML = `<ul><li><strong style="color:black;">LinkedIn: </strong> ${resume.basics.profiles.url}</li></ul>`;

    let technicalSkillsList = document.getElementById('technicalSkills');
    technicalSkillsList.innerHTML = resume.skills.keywords.map(skill => `<li>${skill}</li>`).join('');

    let hobbiesList = document.getElementById('hobbies');
    hobbiesList.innerHTML = resume.interests.hobbies.map(hobby => `<li>${hobby}</li>`).join('');

    document.getElementById('position').innerHTML = `<ul><li><strong>Company Name : </strong>${resume.work.CompanyName} </li> <li><strong>Position : </strong> ${resume.work.Position}</li> <li><strong>Duration : </strong>${resume.work.StartDate} to ${resume.work.EndDate}</li></ul>`;
    document.getElementById('duration').innerHTML = `<ul><li><strong>Summary : </strong>${resume.work.Summary}</li></ul>`;

    let projectList = document.getElementById('projects');
    projectList.innerHTML = `<li><strong>${resume.projects.name}:</strong> ${resume.projects.description}</li>`;

    let educationList = document.getElementById('education');
    educationList.innerHTML = `<ul>
    <li><strong>UG : </strong>${resume.education.UG.institute} - ${resume.education.UG.course} (${resume.education.UG.StartDate} to ${resume.education.UG.EndDate}), CGPA: ${resume.education.UG.cgpa}</li> 
    <li><strong>Senior Secondary : </strong>${resume.education["Senior Secondary"].institute}, CGPA: ${resume.education["Senior Secondary"].cgpa}</li> 
    <li><strong>High School:  </strong>${resume.education["High School"].institute}, CGPA: ${resume.education["High School"].cgpa}</li>
    </ul>`;

    if (resume.Internship) {
        let internshipList = document.getElementById('internships');
        internshipList.innerHTML = `<ul>
        <li><strong>Company Name : </strong>${resume.Internship.CompanyName}</li>
        <li><strong>Position : </strong>  ${resume.Internship.Position}</li> 
        <li><strong>Duration : </strong> ${resume.Internship.StartDate} to ${resume.Internship.EndDate}</li> 
        <li><strong>Summary : </strong>${resume.Internship.Summary}</li>
        </ul>`;
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
