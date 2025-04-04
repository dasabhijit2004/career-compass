import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const predefinedSkills = ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Python', 'Java', 'SQL', 'Communication', 'Decision Making', 'Self-Motivation', 'Team Management', 'Other'];

const ResumeGenerator = () => {
    const [preview, setPreview] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [isOther, setIsOther] = useState(false);
    const [customSkill, setCustomSkill] = useState('');
    const [achievements, setAchievements] = useState([{ title: '', role: '' }]);
    const [experiences, setExperiences] = useState([{
        company: '',
        role: '',
        startDate: '',
        endDate: ''
    }]);
    // Add after the experiences state declaration
    const [projects, setProjects] = useState([{
        title: '',
        description: '',
        technologies: '',
        link: ''
    }]);

    const [courses, setCourses] = useState([{
        title: '',
        provider: '',
        date: ''
    }]);

    const addSkill = (skill) => {
        if (skill === 'Other') {
            setIsOther(true);
        } else if (!selectedSkills.includes(skill)) {
            setSelectedSkills([...selectedSkills, skill]);
            setIsOther(false);
        }
    };

    const addCustomSkill = () => {
        if (customSkill && !selectedSkills.includes(customSkill)) {
            setSelectedSkills([...selectedSkills, customSkill]);
            setCustomSkill('');
            setIsOther(false);
        }
    };

    const removeSkill = (skill) => {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    };

    const addAchievement = () => {
        setAchievements([...achievements, { title: '', role: '' }]);
    };

    const handleAchievementChange = (index, field, value) => {
        const updatedAchievements = [...achievements];
        updatedAchievements[index][field] = value;
        setAchievements(updatedAchievements);
    };

    const addExperience = () => {
        setExperiences([...experiences, {
            company: '',
            role: '',
            startDate: '',
            endDate: ''
        }]);
    };

    const handleExperienceChange = (index, field, value) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index][field] = value;
        setExperiences(updatedExperiences);
    };

    const addProject = () => {
        setProjects([...projects, {
            title: '',
            description: '',
            technologies: '',
            link: ''
        }]);
    };

    const handleProjectChange = (index, field, value) => {
        const updatedProjects = [...projects];
        updatedProjects[index][field] = value;
        setProjects(updatedProjects);
    };

    const addCourse = () => {
        setCourses([...courses, {
            title: '',
            provider: '',
            date: ''
        }]);
    };

    const handleCourseChange = (index, field, value) => {
        const updatedCourses = [...courses];
        updatedCourses[index][field] = value;
        setCourses(updatedCourses);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Set up fonts & colors
        const primaryColor = [41, 128, 185]; // Professional blue

        // Name as header
        doc.setFontSize(24);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(formik.values.name, pageWidth / 2, 20, { align: 'center' });

        // Contact information
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const contactInfo = `${formik.values.email} | ${formik.values.phone} | ${formik.values.linkedin} | ${formik.values.github}`;
        doc.text(contactInfo, pageWidth / 2, 28, { align: 'center' });

        // Horizontal line
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setLineWidth(0.5);
        doc.line(15, 32, pageWidth - 15, 32);

        let yPos = 40;
        const leftMargin = 15;
        const rightMargin = pageWidth - 15;

        // Section: Experience
        doc.setFontSize(14);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("PROFESSIONAL EXPERIENCE", leftMargin, yPos);
        doc.setLineWidth(0.2);
        doc.line(leftMargin, yPos + 2, rightMargin, yPos + 2);
        yPos += 10;

        // Experience details
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);

        experiences.forEach(exp => {
            if (!exp.company && !exp.role) return; // Skip empty experiences

            doc.setFont(undefined, 'bold');
            doc.text(exp.company, leftMargin, yPos);

            // Role and date on the same line, role on left, date on right
            doc.setFont(undefined, 'bold');
            doc.text(exp.role, leftMargin, yPos + 5);

            doc.setFont(undefined, 'normal');
            const dateRange = `${exp.startDate} - ${exp.endDate}`;
            doc.text(dateRange, rightMargin, yPos + 5, { align: 'right' });

            yPos += 12;
        });

        yPos += 5;

        // Section: Skills
        doc.setFontSize(14);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("SKILLS", leftMargin, yPos);
        doc.setLineWidth(0.2);
        doc.line(leftMargin, yPos + 2, rightMargin, yPos + 2);
        yPos += 10;

        // Skills content
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');

        const skillsText = selectedSkills.join(', ');
        const splitSkills = doc.splitTextToSize(skillsText, rightMargin - leftMargin);
        doc.text(splitSkills, leftMargin, yPos);
        yPos += splitSkills.length * 5 + 10;

        // Section: Education
        doc.setFontSize(14);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("EDUCATION", leftMargin, yPos);
        doc.setLineWidth(0.2);
        doc.line(leftMargin, yPos + 2, rightMargin, yPos + 2);
        yPos += 10;

        // Education content
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        const educationText = formik.values.education;
        const splitEducation = doc.splitTextToSize(educationText, rightMargin - leftMargin);
        doc.text(splitEducation, leftMargin, yPos);
        yPos += splitEducation.length * 5 + 10;

        // Section: Achievements
        if (achievements.some(a => a.title || a.role)) {
            doc.setFontSize(14);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text("ACHIEVEMENTS", leftMargin, yPos);
            doc.setLineWidth(0.2);
            doc.line(leftMargin, yPos + 2, rightMargin, yPos + 2);
            yPos += 10;

            // Achievements content
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);

            achievements.forEach(achievement => {
                if (!achievement.title && !achievement.role) return; // Skip empty achievements
                doc.setFont(undefined, 'bold');
                doc.text(achievement.title, leftMargin, yPos);
                doc.setFont(undefined, 'normal');
                doc.text(achievement.role, leftMargin + 5, yPos + 5);
                yPos += 12;
            });
        }

        // Add after the Achievements section in the generatePDF function
        // Section: Projects
        if (projects.some(p => p.title || p.description)) {
            yPos += 5;
            doc.setFontSize(14);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text("PROJECTS", leftMargin, yPos);
            doc.setLineWidth(0.2);
            doc.line(leftMargin, yPos + 2, rightMargin, yPos + 2);
            yPos += 10;

            // Projects content
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);

            projects.forEach(project => {
                if (!project.title && !project.description) return; // Skip empty projects

                doc.setFont(undefined, 'bold');
                doc.text(project.title, leftMargin, yPos);
                yPos += 5;

                if (project.technologies) {
                    doc.setFont(undefined, 'italic');
                    const techText = `Technologies: ${project.technologies}`;
                    doc.text(techText, leftMargin, yPos);
                    yPos += 5;
                }

                if (project.description) {
                    doc.setFont(undefined, 'normal');
                    const descLines = doc.splitTextToSize(project.description, rightMargin - leftMargin);
                    doc.text(descLines, leftMargin, yPos);
                    yPos += descLines.length * 5;
                }

                if (project.link) {
                    doc.setTextColor(41, 128, 185); // Blue for links
                    doc.text(project.link, leftMargin, yPos);
                    doc.setTextColor(0, 0, 0); // Reset text color
                    yPos += 5;
                }

                yPos += 5; // Space between projects
            });
        }

        // Section: Courses/Training
        if (courses.some(c => c.title || c.provider)) {
            yPos += 5;
            doc.setFontSize(14);
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text("COURSES & TRAINING", leftMargin, yPos);
            doc.setLineWidth(0.2);
            doc.line(leftMargin, yPos + 2, rightMargin, yPos + 2);
            yPos += 10;

            // Courses content
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);

            courses.forEach(course => {
                if (!course.title && !course.provider) return; // Skip empty courses

                doc.setFont(undefined, 'bold');
                doc.text(course.title, leftMargin, yPos);

                const dateAndProvider = course.provider + (course.date ? ` (${course.date})` : '');
                doc.setFont(undefined, 'normal');
                doc.text(dateAndProvider, leftMargin + 5, yPos + 5);
                yPos += 12;
            });
        }

        // Save PDF
        doc.save(`${formik.values.name.replace(/\s+/g, '_')}_resume.pdf`);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            education: '',
            linkedin: '',
            github: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phone: Yup.string().required('Phone number is required'),
            education: Yup.string().required('Education details are required'),
            linkedin: Yup.string().url('Invalid URL').required('LinkedIn profile is required'),
            github: Yup.string().url('Invalid URL').required('GitHub profile is required'),
        }),
        onSubmit: (values) => {
            setPreview(true);
        },
    });

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-4 text-center">Resume Generator</h1>
            <div className="p-6 bg-white shadow-xl rounded-2xl max-w-4xl mx-auto">
                {!preview ? (
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Name</label>
                                <input
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    placeholder="Enter your full name"
                                    className="w-full p-2 border rounded-md"
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Phone</label>
                                <input
                                    name="phone"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                    placeholder="Enter your phone number"
                                    className="w-full p-2 border rounded-md"
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">Email</label>
                                <input
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    placeholder="Enter your email address"
                                    className="w-full p-2 border rounded-md"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">LinkedIn</label>
                                <input
                                    name="linkedin"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.linkedin}
                                    placeholder="Enter your LinkedIn profile URL"
                                    className="w-full p-2 border rounded-md"
                                />
                                {formik.touched.linkedin && formik.errors.linkedin && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.linkedin}</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg font-semibold mb-2">GitHub</label>
                                <input
                                    name="github"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.github}
                                    placeholder="Enter your GitHub profile URL"
                                    className="w-full p-2 border rounded-md"
                                />
                                {formik.touched.github && formik.errors.github && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.github}</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Education</label>
                            <textarea
                                name="education"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.education}
                                placeholder="Enter your education details"
                                className="w-full p-2 border rounded-md"
                                rows="3"
                            />
                            {formik.touched.education && formik.errors.education && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.education}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Experience</label>
                            {experiences.map((exp, index) => (
                                <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="mb-2">
                                            <label className="block font-medium mb-1">Company</label>
                                            <input
                                                placeholder="Company Name"
                                                value={exp.company}
                                                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                                className="w-full p-2 border rounded-md"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block font-medium mb-1">Role</label>
                                            <input
                                                placeholder="Job Title"
                                                value={exp.role}
                                                onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                                                className="w-full p-2 border rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-medium mb-1">Start Date</label>
                                            <input
                                                placeholder="MM/YYYY"
                                                value={exp.startDate}
                                                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                                className="w-full p-2 border rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-medium mb-1">End Date</label>
                                            <input
                                                placeholder="MM/YYYY or Present"
                                                value={exp.endDate}
                                                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                                className="w-full p-2 border rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addExperience}
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Add More Experience
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Achievements</label>
                            {achievements.map((ach, index) => (
                                <div key={index} className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        placeholder="Achievement Title"
                                        value={ach.title}
                                        onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                    <input
                                        placeholder="Role/Details"
                                        value={ach.role}
                                        onChange={(e) => handleAchievementChange(index, 'role', e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addAchievement}
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Add More Achievements
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Skills</label>
                            <div className="flex flex-wrap gap-2 mb-4 p-4 border rounded-md bg-gray-50">
                                {selectedSkills.map((skill) => (
                                    <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                                        {skill}
                                        <button
                                            onClick={() => removeSkill(skill)}
                                            className="ml-2 text-blue-800 hover:text-red-500"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                                {selectedSkills.length === 0 && (
                                    <span className="text-gray-500 italic">No skills selected</span>
                                )}
                            </div>
                            <div className="mb-2">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {predefinedSkills.map((skill) => (
                                        <button
                                            key={skill}
                                            type="button"
                                            onClick={() => addSkill(skill)}
                                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                                        >
                                            {skill}
                                        </button>
                                    ))}
                                </div>
                                {isOther && (
                                    <div className="flex gap-2 mt-2">
                                        <input
                                            value={customSkill}
                                            onChange={(e) => setCustomSkill(e.target.value)}
                                            placeholder="Enter custom skill"
                                            className="flex-grow p-2 border rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={addCustomSkill}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Projects Section - Add after the Skills section */}
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Projects</label>
                            {projects.map((proj, index) => (
                                <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                                    <div className="mb-2">
                                        <label className="block font-medium mb-1">Project Title</label>
                                        <input
                                            placeholder="Project Name"
                                            value={proj.title}
                                            onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block font-medium mb-1">Technologies Used</label>
                                        <input
                                            placeholder="React, Node.js, etc."
                                            value={proj.technologies}
                                            onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block font-medium mb-1">Description</label>
                                        <textarea
                                            placeholder="Brief description of your project"
                                            value={proj.description}
                                            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                            className="w-full p-2 border rounded-md"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block font-medium mb-1">Project Link (optional)</label>
                                        <input
                                            placeholder="https://github.com/yourusername/project"
                                            value={proj.link}
                                            onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addProject}
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Add More Projects
                            </button>
                        </div>

                        {/* Courses/Training Section */}
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2">Courses & Training</label>
                            {courses.map((course, index) => (
                                <div key={index} className="mb-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        placeholder="Course Title"
                                        value={course.title}
                                        onChange={(e) => handleCourseChange(index, 'title', e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                    <input
                                        placeholder="Provider (Udemy, Coursera, etc.)"
                                        value={course.provider}
                                        onChange={(e) => handleCourseChange(index, 'provider', e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                    <input
                                        placeholder="Completion Date"
                                        value={course.date}
                                        onChange={(e) => handleCourseChange(index, 'date', e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addCourse}
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Add More Courses/Training
                            </button>
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                Generate Resume
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Resume Preview</h2>
                            <button
                                onClick={generatePDF}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Download PDF
                            </button>
                        </div>

                        <div className="p-8 border rounded-lg bg-white shadow-md max-w-3xl mx-auto">
                            {/* Resume Preview */}
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-bold text-blue-700">{formik.values.name}</h1>
                                <p className="text-gray-700 mt-2">
                                    {formik.values.email} | {formik.values.phone} | {formik.values.linkedin} | {formik.values.github}
                                </p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-blue-700 border-b border-blue-700 pb-1 mb-3">PROFESSIONAL EXPERIENCE</h2>
                                {experiences.map((exp, index) => (
                                    <div key={index} className="mb-4">
                                        {(exp.company || exp.role) && (
                                            <>
                                                <div className="font-bold">{exp.company}</div>
                                                <div className="flex justify-between">
                                                    <div className="font-bold">{exp.role}</div>
                                                    <div>{exp.startDate} - {exp.endDate}</div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-blue-700 border-b border-blue-700 pb-1 mb-3">SKILLS</h2>
                                <p>{selectedSkills.join(', ')}</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-blue-700 border-b border-blue-700 pb-1 mb-3">EDUCATION</h2>
                                <p>{formik.values.education}</p>
                            </div>

                            {/* Projects Preview - add after Education section in the preview */}
                            {projects.some(p => p.title || p.description) && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-blue-700 border-b border-blue-700 pb-1 mb-3">PROJECTS</h2>
                                    {projects.map((proj, index) => (
                                        <div key={index} className="mb-4">
                                            {(proj.title || proj.description) && (
                                                <>
                                                    <div className="font-bold">{proj.title}</div>
                                                    {proj.technologies && (
                                                        <div className="italic">Technologies: {proj.technologies}</div>
                                                    )}
                                                    {proj.description && (
                                                        <div className="ml-3">{proj.description}</div>
                                                    )}
                                                    {proj.link && (
                                                        <div className="ml-3 text-blue-600">{proj.link}</div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Courses Preview */}
                            {courses.some(c => c.title || c.provider) && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-blue-700 border-b border-blue-700 pb-1 mb-3">COURSES & TRAINING</h2>
                                    {courses.map((course, index) => (
                                        <div key={index} className="mb-2">
                                            {(course.title || course.provider) && (
                                                <>
                                                    <div className="font-bold">{course.title}</div>
                                                    <div className="ml-3">
                                                        {course.provider}{course.date ? ` (${course.date})` : ''}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {achievements.some(a => a.title || a.role) && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-blue-700 border-b border-blue-700 pb-1 mb-3">ACHIEVEMENTS</h2>
                                    {achievements.map((ach, index) => (
                                        <div key={index} className="mb-2">
                                            {(ach.title || ach.role) && (
                                                <>
                                                    <div className="font-bold">{ach.title}</div>
                                                    <div className="ml-3">{ach.role}</div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setPreview(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors mr-4"
                            >
                                Back to Edit
                            </button>
                            <button
                                onClick={generatePDF}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeGenerator;