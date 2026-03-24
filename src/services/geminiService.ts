import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const geminiService = {
  /**
   * General AI Chatbot using gemini-3.1-pro-preview
   */
  async chat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
    const chat = ai.chats.create({
      model: "gemini-3.1-pro-preview",
      config: {
        systemInstruction: "You are MedFlow AI, a specialized medical assistant integrated into the MedFlow Hospital Management System. You help doctors, staff, and patients with medical queries, system navigation, and data insights. Always maintain a professional, empathetic, and clinical tone. If asked about specific patient data, remind the user that you can only provide general medical information unless they are viewing a specific record.",
      },
      history: history as any,
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  },

  /**
   * Fast AI responses using gemini-3.1-flash-lite-preview
   */
  async fastResponse(prompt: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: prompt,
    });
    return response.text;
  },

  /**
   * Complex analysis with Thinking Mode using gemini-3.1-pro-preview
   */
  async complexAnalysis(prompt: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });
    return response.text;
  },

  /**
   * Analyze medical records for insights
   */
  async analyzeMedicalRecord(record: any) {
    const prompt = `Analyze this medical record and provide a concise clinical summary, potential risks, and recommended follow-up actions:
    Record Type: ${record.type}
    Date: ${record.date}
    Details: ${record.details}
    Patient: ${record.patient_name}
    Doctor: ${record.doctor_name}`;

    return this.fastResponse(prompt);
  }
};
