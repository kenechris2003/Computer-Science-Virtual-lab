import { PrismaClient, UserRole, LabType, Difficulty } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create demo lecturer
  const lecturerPassword = await bcrypt.hash("lecturer123", 12);
  const lecturer = await prisma.user.upsert({
    where: { email: "lecturer@virtuallab.edu.ng" },
    update: {},
    create: {
      email: "lecturer@virtuallab.edu.ng",
      password: lecturerPassword,
      firstName: "Dr. Emmanuel",
      lastName: "Adeyemi",
      role: UserRole.LECTURER,
      isVerified: true,
      department: "Computer Science",
      profile: {
        create: {
          institution: "University of Lagos",
          faculty: "Computing",
        },
      },
    },
  });

  // Create demo student
  const studentPassword = await bcrypt.hash("student123", 12);
  const student = await prisma.user.upsert({
    where: { email: "student@virtuallab.edu.ng" },
    update: {},
    create: {
      email: "student@virtuallab.edu.ng",
      password: studentPassword,
      firstName: "Chinedu",
      lastName: "Okonkwo",
      matricNumber: "CSC/2024/001",
      role: UserRole.STUDENT,
      isVerified: true,
      level: 100,
      department: "Computer Science",
      profile: {
        create: {
          institution: "University of Lagos",
          faculty: "Computing",
        },
      },
    },
  });

  // Create courses
  const courses = [
    { code: "CSC101", title: "Introduction to Computer Science", level: 100, semester: 1 },
    { code: "CSC102", title: "Programming Fundamentals", level: 100, semester: 2 },
    { code: "CSC201", title: "Data Structures & Algorithms", level: 200, semester: 1 },
    { code: "CSC202", title: "Web Development", level: 200, semester: 2 },
    { code: "CSC203", title: "Database Systems", level: 200, semester: 1 },
    { code: "CSC204", title: "Operating Systems", level: 200, semester: 2 },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { code: course.code },
      update: {},
      create: course,
    });
  }

  // Create laboratories
  const labs = [
    {
      title: "Python Programming Lab",
      description: "Learn Python programming from basics to advanced concepts",
      type: LabType.PROGRAMMING,
      orderIndex: 1,
    },
    {
      title: "Java Programming Lab",
      description: "Object-oriented programming with Java",
      type: LabType.PROGRAMMING,
      orderIndex: 2,
    },
    {
      title: "Web Development Lab",
      description: "Build responsive websites with HTML, CSS, and JavaScript",
      type: LabType.WEB_DEVELOPMENT,
      orderIndex: 3,
    },
    {
      title: "SQL Database Lab",
      description: "Practice SQL queries and database design",
      type: LabType.DATABASE,
      orderIndex: 4,
    },
    {
      title: "Linux Terminal Lab",
      description: "Master Linux command line operations",
      type: LabType.OPERATING_SYSTEMS,
      orderIndex: 5,
    },
  ];

  for (const lab of labs) {
    await prisma.laboratory.upsert({
      where: { id: lab.title },
      update: {},
      create: lab,
    });
  }

  // Create sample exercises
  const pythonLab = await prisma.laboratory.findFirst({
    where: { title: "Python Programming Lab" },
  });

  if (pythonLab) {
    await prisma.exercise.upsert({
      where: { id: "hello-world-exercise" },
      update: {},
      create: {
        id: "hello-world-exercise",
        title: "Hello World",
        description: "Write a Python program that prints 'Hello, World!' to the console.",
        instructions: "1. Use the print() function\n2. Output exactly: Hello, World!",
        starterCode: '# Write your code here\n',
        expectedOutput: "Hello, World!",
        language: "python",
        labId: pythonLab.id,
        difficulty: Difficulty.BEGINNER,
        points: 5,
        isPublished: true,
      },
    });

    await prisma.exercise.upsert({
      where: { id: "sum-two-numbers" },
      update: {},
      create: {
        id: "sum-two-numbers",
        title: "Sum of Two Numbers",
        description: "Write a program that takes two numbers as input and prints their sum.",
        instructions: "1. Use input() to get two numbers\n2. Convert to integers\n3. Print the sum",
        starterCode: '# Get two numbers from user\nnum1 = int(input())\nnum2 = int(input())\n\n# Calculate and print sum\n',
        expectedOutput: "15",
        language: "python",
        labId: pythonLab.id,
        difficulty: Difficulty.BEGINNER,
        points: 10,
        testCases: JSON.stringify([
          { input: "5\n10\n", expected: "15" },
          { input: "3\n7\n", expected: "10" },
        ]),
        isPublished: true,
      },
    });
  }

  console.log("✅ Seed completed successfully!");
  console.log("👨‍🏫 Lecturer: lecturer@virtuallab.edu.ng / lecturer123");
  console.log("👨‍🎓 Student: student@virtuallab.edu.ng / student123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });