type EducationData = {
    id: number;
    institution: string;
    degree: string;
    period: string;
    grade: string;
    description: string[];
    projects: string[];
    skills: string[];
    color: string;
};

const educationData: EducationData[] = [
    {
        id: 1,
        institution: 'Gujarat Technological University (GTU)',
        degree: "Bachelor's degree, Computer Engineering",
        period: 'Jun 2016 - Jun 2020',
        grade: '8.7/10',
        description: [
            'Participated in a Hackathon focused on developing innovative solutions for the banking industry.',
            'Designed and developed posters for the Technothon Festival across multiple departments.',
            'Successfully managed and organised various technical events.',
            'Won first place in an elocution competition.',
            'Gained theoretical and practical understanding of Operating Systems, grammar theory, and CPU architecture.',
            'Developed strong programming and problem-solving skills, with a focus on software engineering and cloud computing.',
        ],
        projects: [
            'Library Management System',
            'Banking System',
            'ATM System',
            'NLP-based Python Syntax Analyzer with Machine Learning',
        ],
        skills: [
            'Python',
            'Machine Learning',
            'Cloud Computing',
            'Software Development',
            'AWS',
            'SDLC',
            'Adobe Photoshop',
        ],
        color: '#1D4ED8',
    },
];

export type { EducationData };
export default educationData;
