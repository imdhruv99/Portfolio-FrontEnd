export interface WhatIDoItem {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    points: string[];
    image: string;
}

export const whatIDoData: WhatIDoItem[] = [
    {
        id: "ml-ai",
        title: "Machine Learning and Artificial Intelligence",
        description: "Building intelligent systems that learn, adapt, and deliver actionable insights through advanced algorithms and deep learning architectures.",
        technologies: ["Python", "Tensorflow", "Keras", "Sklearn", "Pandas", "Numpy", "JupyterNotebook", "CV2"],
        points: [
            "Developed and deployed ML models for predictive analytics with 95% accuracy",
            "Implemented computer vision solutions for real-time object detection and classification",
            "Built recommendation systems handling millions of user interactions daily",
            "Optimized neural networks for edge deployment reducing inference time by 60%"
        ],
        image: "/images/aiml.png"
    },
    {
        id: "fullstack",
        title: "Full Stack Development",
        description: "Crafting end-to-end web applications with modern frameworks, focusing on performance, scalability, and exceptional user experiences.",
        technologies: ["ReactJs", "NodeJs", "JavaScript", "Python", "Flask", "MongoDB", "Postgres", "Java"],
        points: [
            "Built responsive web applications serving 100K+ active users",
            "Developed RESTful APIs with robust authentication and authorization systems",
            "Implemented real-time features using WebSocket connections and event-driven architecture",
            "Optimized database queries reducing response times by 75%"
        ],
        image: "/images/oldpc.png"
    },
    {
        id: "devops-cloud",
        title: "DevOps & Cloud Infrastructure",
        description: "Architecting scalable cloud solutions and automating deployment pipelines to ensure reliable, secure, and efficient operations.",
        technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "Helm", "ELKStack"],
        points: [
            "Designed and implemented CI/CD pipelines reducing deployment time by 80%",
            "Orchestrated containerized applications using Kubernetes with auto-scaling capabilities",
            "Managed multi-region AWS infrastructure serving global traffic with 99.9% uptime",
            "Automated infrastructure provisioning using Infrastructure as Code principles"
        ],
        image: "/images/automation.png"
    },
    {
        id: "photography",
        title: "Photography and Editing",
        description: "Capturing moments through creative lens work and transforming them into compelling visual narratives through advanced post-processing.",
        technologies: ["Photoshop", "Lightroom"],
        points: [
            "Specialized in portrait and landscape photography with professional lighting techniques",
            "Advanced photo editing and color grading using industry-standard software",
            "Created visual content for digital marketing campaigns and brand storytelling",
            "Developed custom presets and workflows for efficient batch processing"
        ],
        image: "/images/camera.png"
    }
];

export default whatIDoData;
