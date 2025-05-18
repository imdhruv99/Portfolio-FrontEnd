type ProjectData = {
    id: number;
    title: string;
    description: string;
    technicalStack: string[];
    link?: string[];
    category: string;
    tags: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
};

const projectData: ProjectData[] = [
    {
        id: 1,
        title: "Task Manager",
        description: "A containerized task management system built with Python, Flask, and Redis, leveraging Postgres, Docker, Kubernetes, and Helm for scalable deployment.",
        technicalStack: ['Python', 'Flask', 'Redis', 'Postgres', 'Docker', 'Kubernetes', 'Helm'],
        link: ['https://github.com/imdhruv99/Task-Manager'],
        category: 'Web Development',
        tags: ['Containerization', 'Task Management', 'Docker', 'Kubernetes', 'Scalability'],
        difficulty: 'Intermediate',
    },
    {
        id: 2,
        title: "Face Mask Detection",
        description: "A deep learning-based system for real-time face mask detection using Python, OpenCV, and Keras.",
        technicalStack: ['Python', 'Numpy', 'Keras', 'Pandas', 'CV2'],
        link: ['https://github.com/imdhruv99/FaceMask-Detection'],
        category: 'Machine Learning',
        tags: ['Computer Vision', 'Deep Learning', 'Real-time', 'Mask Detection', 'AI'],
        difficulty: 'Intermediate',
    },
    {
        id: 3,
        title: "DevOps Workflows",
        description: "An automation project built with Go and Gin, integrating Jenkins, Docker, Terraform, Ansible, and AWS for learning DevOps workflows.",
        technicalStack: ['Go', 'Gin', 'Jenkins', 'Docker', 'Terraform', 'Ansible', 'AWS'],
        link: ['https://github.com/imdhruv99/DevOps-Automation'],
        category: 'DevOps',
        tags: ['CI/CD', 'Automation', 'Jenkins', 'Docker', 'AWS', 'Terraform', 'Ansible'],
        difficulty: 'Advanced',
    },
    {
        id: 4,
        title: "OCR Neural Net",
        description: "An OCR system implementing a neural network from scratch using Python and NumPy, with visualizations via Matplotlib.",
        technicalStack: ['Python', 'Numpy', 'Matplotlib', 'HTML', 'CSS', 'JavaScript'],
        link: ['https://github.com/imdhruv99/My-Own-Neural-Network'],
        category: 'Machine Learning',
        tags: ['Neural Network', 'OCR', 'Deep Learning', 'Computer Vision'],
        difficulty: 'Advanced',
    },
    {
        id: 5,
        title: "Object Detection",
        description: "A Django-based web app for object detection using a ResNet50 model, with support for image processing and visualization through NumPy and Matplotlib.",
        technicalStack: ['Python', 'Django', 'Numpy', 'Matplotlib', 'Tensorflow', 'Keras', 'HTML'],
        link: ['https://github.com/imdhruv99/ObjectDetection-Resnet50-Django'],
        category: 'Web Development',
        tags: ['Object Detection', 'Deep Learning', 'Django', 'Computer Vision', 'ResNet50'],
        difficulty: 'Intermediate',
    },
    {
        id: 6,
        title: "Employee Retention",
        description: "A machine learning web app built with Flask and XGBoost to predict employee retention, featuring data visualization, Docker deployment, and ELK Stack integration.",
        technicalStack: ['Python', 'Flask', 'Numpy', 'Pandas', 'Matplotlib', 'Sklearn', 'HTML', 'Docker', 'ELK Stack'],
        link: ['https://github.com/imdhruv99/Employee-Retention-Prediction'],
        category: 'Machine Learning',
        tags: ['Employee Retention', 'ML', 'Flask', 'XGBoost', 'Data Visualization', 'Docker'],
        difficulty: 'Advanced',
    },
    {
        id: 7,
        title: "Forest Fire Prediction",
        description: "A web-based logistic regression model using Flask to predict and help prevent forest fires with data-driven insights and visualization.",
        technicalStack: ['Python', 'HTML', 'CSS', 'JavaScript', 'Sklearn'],
        link: ['https://github.com/imdhruv99/LogisticRegression-Flask-ForestFirePreventation'],
        category: 'Machine Learning',
        tags: ['Logistic Regression', 'Flask', 'Predictive Modeling', 'Forest Fire Prevention', 'Sklearn'],
        difficulty: 'Intermediate',
    },
    {
        id: 8,
        title: "Maruti Website",
        description: "A dynamic website developed and deployed using PHP, HTML, CSS, and JavaScript for a local Maruti import-export business.",
        technicalStack: ['HTML', 'CSS', 'JavaScript', 'PHP'],
        link: ['https://github.com/imdhruv99/Maruti-Import-Export'],
        category: 'Web Development',
        tags: ['PHP', 'Dynamic Website', 'Business', 'Frontend', 'Backend'],
        difficulty: 'Beginner',
    },
    {
        id: 9,
        title: "SkilTal",
        description: "A responsive website built with HTML, CSS, and JavaScript for a local teaching classes business, designed and deployed to enhance online presence.",
        technicalStack: ['HTML', 'CSS', 'JavaScript'],
        link: ['https://github.com/imdhruv99/SkilTal-Website'],
        category: 'Web Development',
        tags: ['Responsive Design', 'HTML', 'CSS', 'JavaScript', 'Website'],
        difficulty: 'Beginner',
    },
    {
        id: 10,
        title: "DynRestAPI",
        description: "A minimal Node.js setup for creating RESTful APIs dynamically.",
        technicalStack: ['NodeJs'],
        link: ['https://github.com/imdhruv99/Dynamic-Rest-Api-Nodejs-Example'],
        category: 'Backend Development',
        tags: ['Node.js', 'REST API', 'Dynamic API', 'Backend'],
        difficulty: 'Intermediate',
    },
    {
        id: 11,
        title: "Blog-OAuth2.0",
        description: "A RESTful blog backend using Node.js, Express, Passport, and OAuth2 with MongoDB authentication.",
        technicalStack: ['NodeJs', 'ExpressJs', 'Passport', 'OAuth2', 'MongoDB'],
        link: ['https://github.com/imdhruv99/Blog-OAuth2-Nodejs'],
        category: 'Backend Development',
        tags: ['OAuth2', 'Node.js', 'Express', 'MongoDB', 'Authentication'],
        difficulty: 'Intermediate',
    },
    {
        id: 12,
        title: "Go Chat App",
        description: "A real-time chat application built with Go, Gorilla WebSocket, and Docker for easy deployment.",
        technicalStack: ['Go', 'Docker'],
        link: ['https://github.com/imdhruv99/Golang-Gorilla-WebSocket-ChatApp-Docker'],
        category: 'Backend Development',
        tags: ['Go', 'WebSocket', 'Real-time', 'Chat Application', 'Docker'],
        difficulty: 'Intermediate',
    },
    {
        id: 13,
        title: "IdeaBeacon",
        description: "Idea Posting site for community where user can come together and brainstorm with each other.",
        technicalStack: ['NodeJs', 'ExpressJs', 'ReactJS', 'Docker', 'MongoDB'],
        link: ['https://github.com/imdhruv99/IdeaBeacon-FrontEnd/', 'https://github.com/imdhruv99/IdeaBeacon-BackEnd'],
        category: 'Full Stack Development',
        tags: ['NodeJs', 'ExpressJs', 'ReactJS', 'Docker', 'MongoDB'],
        difficulty: 'Intermediate',
    }
];

export type { ProjectData };
export default projectData;
