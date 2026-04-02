# **App Name**: OncoGuard AI

## Core Features:

- Secure User Authentication: Enables users to sign up and log in securely via email/password or Google, with user profiles stored in Firestore.
- Guided Risk Assessment Form: A multi-step form for collecting essential user data including personal information, symptoms, family history, and lifestyle factors.
- AI-Driven Risk Prediction Tool: Sends collected user data to an external machine learning API to predict cancer risk levels and associated confidence scores.
- Generative AI Explanation Tool: Utilizes the Gemini API as a tool to translate complex ML predictions into simple, understandable explanations, suggested precautions, and next steps for the user.
- Personalized Dashboard & Report History: A user dashboard displaying past risk assessments, including input data, calculated risk, confidence, and timestamps, fetched from Firestore.
- Interactive AI Chatbot: Leverages the Gemini API as a conversational tool to provide general information and guidance on symptoms, prevention, and lifestyle choices, offering non-diagnostic support.
- Prominent Medical Disclaimer: Displays a clear, consistent disclaimer on all pages, informing users that the application is for educational purposes only and not a substitute for professional medical advice.

## Style Guidelines:

- Primary color: A clear, trustworthy blue (#4062BF) symbolizing professionalism and reliability.
- Background color: An almost white, highly desaturated cool grey-blue (#ECEEF5), providing a clean and serene backdrop for healthcare information.
- Accent color: A vibrant sky-blue (#67C3DE), used sparingly to draw attention to important calls to action and highlights, evoking clarity and hope.
- Body and headline font: 'Inter' (sans-serif), chosen for its modern, neutral, and objective aesthetic, ensuring optimal readability and clarity across all content.
- Clean, simple, and intuitive health-related icons, designed to quickly convey information and guide users through assessments and reports.
- A responsive card-based layout featuring clear content hierarchy, progress bars for multi-step forms, and dedicated sections for results and history, ensuring usability across devices.
- Subtle and smooth UI transitions and distinct loading indicators will be implemented to provide a polished user experience during data submissions and API interactions.