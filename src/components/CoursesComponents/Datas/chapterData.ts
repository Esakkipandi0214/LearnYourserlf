// Define the Lesson interface
export interface Lesson {
    name: string;
    description: string;
    QuestionCount: string;
    Progess: string;
  }
  
  // Define the Chapter interface
  export interface Chapter {
    id: number;
    title: string;
    modules: number;
    progress: string;
    lessons: Lesson[];
  }
  
  // Define the Course interface
  export interface Course {
    id: number;
    name: string;
    description: string;
    totalChapters: number;
    totalModules: number;
    progress: string;
    collaborators: string[]; // Array of IDs
    chapters: Chapter[];
  }
  
  // Sample data for courses
  export const courses: Course[] = [
    {
      id: 1,
      name: 'Object-Oriented Programming (OOP)',
      description: 'Learn the fundamentals of Object-Oriented Programming with real-world examples.',
      totalChapters: 2,
      totalModules: 40,
      progress: '85%',
      collaborators: ['user1', 'user2', 'user3'],
      chapters: [
        {
          id: 1,
          title: 'OOPS Concepts',
          modules: 22,
          progress: '90%',
          lessons: [
            {
              name: 'Inheritance',
              description: 'Learn how classes inherit properties and methods from parent classes.',
              QuestionCount: '15',
              Progess: '75',
            },
            {
              name: 'Polymorphism',
              description: 'Understand how methods can have multiple forms in different scenarios.',
              QuestionCount: '20',
              Progess: '90',
            },
            {
              name: 'Encapsulation',
              description: 'Explore how data hiding and abstraction work together in OOP.',
              QuestionCount: '10',
              Progess: '50',
            },
            {
              name: 'Abstraction',
              description: 'Dive into the concept of hiding implementation details while showing essential features.',
              QuestionCount: '18',
              Progess: '75',
            },
          ],
        },
        {
          id: 2,
          title: 'Advanced OOP',
          modules: 18,
          progress: '80%',
          lessons: [
            {
              name: 'Design Patterns',
              description: 'Learn about the most commonly used design patterns in OOP.',
              QuestionCount: '25',
              Progess: '90',
            },
            {
              name: 'SOLID Principles',
              description: 'Understand the SOLID principles and how they guide OOP design.',
              QuestionCount: '30',
              Progess: '90',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Data Structures & Algorithms',
      description: 'Master data structures and algorithms for technical interviews and beyond.',
      totalChapters: 1,
      totalModules: 18,
      progress: '75%',
      collaborators: ['user4', 'user5'],
      chapters: [
        {
          id: 1,
          title: 'Data Structures',
          modules: 18,
          progress: '75%',
          lessons: [
            {
              name: 'Arrays',
              description: 'Introduction to arrays, their usage, and performance analysis.',
              QuestionCount: '12',
              Progess: '50',
            },
            {
              name: 'Linked Lists',
              description: 'Learn about singly and doubly linked lists.',
              QuestionCount: '16',
              Progess: '75',
            },
            {
              name: 'Stacks and Queues',
              description: 'Understand how stacks and queues are used in real-world applications.',
              QuestionCount: '20',
              Progess: '75',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Java Programming',
      description: 'Dive deep into Java programming with hands-on examples and real-world projects.',
      totalChapters: 3,
      totalModules: 30,
      progress: '65%',
      collaborators: ['user6', 'user7'],
      chapters: [
        {
          id: 1,
          title: 'Java Basics',
          modules: 10,
          progress: '70%',
          lessons: [
            {
              name: 'Variables and Data Types',
              description: 'Learn about different data types and variables in Java.',
              QuestionCount: '15',
              Progess: '50',
            },
            {
              name: 'Control Flow',
              description: 'Understand conditional statements and loops in Java.',
              QuestionCount: '20',
              Progess: '75',
            },
          ],
        },
        {
          id: 2,
          title: 'Java Object-Oriented Concepts',
          modules: 12,
          progress: '60%',
          lessons: [
            {
              name: 'Classes and Objects',
              description: 'Learn about creating classes and objects in Java.',
              QuestionCount: '25',
              Progess: '75',
            },
            {
              name: 'Inheritance and Polymorphism',
              description: 'Explore inheritance and polymorphism in Java.',
              QuestionCount: '30',
              Progess: '90',
            },
          ],
        },
        {
          id: 3,
          title: 'Advanced Java Programming',
          modules: 8,
          progress: '50%',
          lessons: [
            {
              name: 'Streams and Lambda Expressions',
              description: 'Learn how to use Java streams and lambda expressions.',
              QuestionCount: '20',
              Progess: '90',
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: 'Python Programming',
      description: 'Master Python and learn to build scalable applications.',
      totalChapters: 4,
      totalModules: 35,
      progress: '80%',
      collaborators: ['user8', 'user9'],
      chapters: [
        {
          id: 1,
          title: 'Python Basics',
          modules: 12,
          progress: '85%',
          lessons: [
            {
              name: 'Variables and Data Types',
              description: 'Learn about variables and data types in Python.',
              QuestionCount: '10',
              Progess: '50',
            },
            {
              name: 'Loops and Conditional Statements',
              description: 'Understand loops and conditional statements in Python.',
              QuestionCount: '15',
              Progess: '50',
            },
          ],
        },
        {
          id: 2,
          title: 'Object-Oriented Programming with Python',
          modules: 10,
          progress: '70%',
          lessons: [
            {
              name: 'Classes and Objects',
              description: 'Learn how to create classes and objects in Python.',
              QuestionCount: '20',
              Progess: '75',
            },
            {
              name: 'Inheritance',
              description: 'Understand inheritance in Python.',
              QuestionCount: '18',
              Progess: '75',
            },
          ],
        },
        {
          id: 3,
          title: 'Python Libraries and Frameworks',
          modules: 8,
          progress: '75%',
          lessons: [
            {
              name: 'NumPy and Pandas',
              description: 'Learn the basics of NumPy and Pandas for data manipulation.',
              QuestionCount: '25',
              Progess: '75',
            },
          ],
        },
        {
          id: 4,
          title: 'Advanced Python',
          modules: 5,
          progress: '90%',
          lessons: [
            {
              name: 'Decorators and Generators',
              description: 'Master Python decorators and generators.',
              QuestionCount: '30',
              Progess: '90',
            },
          ],
        },
      ],
    },
    {
      id: 5,
      name: 'C++ Programming',
      description: 'Learn C++ from scratch and build high-performance applications.',
      totalChapters: 3,
      totalModules: 28,
      progress: '70%',
      collaborators: ['user10', 'user11'],
      chapters: [
        {
          id: 1,
          title: 'C++ Basics',
          modules: 10,
          progress: '80%',
          lessons: [
            {
              name: 'Variables and Operators',
              description: 'Understand variables and operators in C++.',
              QuestionCount: '15',
              Progess: '50',
            },
            {
              name: 'Control Flow and Functions',
              description: 'Learn about loops, conditionals, and functions in C++.',
              QuestionCount: '20',
              Progess: '75',
            },
          ],
        },
        {
          id: 2,
          title: 'C++ Object-Oriented Programming',
          modules: 12,
          progress: '60%',
          lessons: [
            {
              name: 'Classes and Objects',
              description: 'Learn how to create classes and objects in C++.',
              QuestionCount: '25',
              Progess: '75',
            },
            {
              name: 'Inheritance and Polymorphism',
              description: 'Explore inheritance and polymorphism in C++.',
              QuestionCount: '30',
              Progess: '90',
            },
          ],
        },
        {
          id: 3,
          title: 'Advanced C++ Concepts',
          modules: 6,
          progress: '50%',
          lessons: [
            {
              name: 'Memory Management',
              description: 'Understand memory management in C++.',
              QuestionCount: '35',
              Progess: '90',
            },
          ],
        },
      ],
    },
    {
      id: 6,
      name: 'Go Programming',
      description: 'Master Go programming and learn concurrency for high-performance systems.',
      totalChapters: 3,
      totalModules: 25,
      progress: '78%',
      collaborators: ['user12', 'user13'],
      chapters: [
        {
          id: 1,
          title: 'Go Basics',
          modules: 8,
          progress: '90%',
          lessons: [
            {
              name: 'Variables and Data Types',
              description: 'Learn about basic data types in Go.',
              QuestionCount: '12 ',
              Progess: '50',
            },
            {
              name: 'Control Structures',
              description: 'Understand loops, conditionals, and switch cases in Go.',
              QuestionCount: '15',
              Progess: '75',
            },
          ],
        },
        {
          id: 2,
          title: 'Concurrency in Go',
          modules: 10,
          progress: '70%',
          lessons: [
            {
              name: 'Goroutines and Channels',
              description: 'Learn about Go goroutines and channels for concurrent programming.',
              QuestionCount: '20',
              Progess: '90',
            },
          ],
        },
        {
          id: 3,
          title: 'Go Advanced Concepts',
          modules: 7,
          progress: '80%',
          lessons: [
            {
              name: 'Error Handling and Testing',
              description: 'Master error handling and writing tests in Go.',
              QuestionCount: '30',
              Progess: '90',
            },
          ],
        },
      ],
    },
  ];
  
  