import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "AI MedFlow Protocol",
      "welcome": "Welcome to AI MedFlow",
      "dashboard": "Dashboard",
      "patients": "Patients",
      "doctors": "Doctors",
      "wards": "Wards & Beds",
      "pharmacy": "Pharmacy",
      "records": "Medical Records",
      "analytics": "Analytics",
      "users": "User Management",
      "settings": "Settings",
      "search": "Search",
      "logout": "Logout",
      "ai_doctor": "AI Doctor Assistant",
      "video_call": "Video Conference",
      "contact_doctor": "Contact Doctor",
      "contact_patient": "Contact Patient",
      "type_message": "Type your message...",
      "type_medical_query": "Type your medical query...",
      "language": "Language",
      "system_status": "System Status: Operational",
      "initialize": "Initialize Protocol",
      "request_access": "Request Access",
      "portal_login": "Portal Login",
      "ai_doctor_prompt": "I am your AI Medical Assistant. How can I help you today?",
      "send": "Send"
    }
  },
  bn: {
    translation: {
      "app_name": "এআই মেডফ্লো প্রোটোকল",
      "welcome": "এআই মেডফ্লোতে স্বাগতম",
      "dashboard": "ড্যাশবোর্ড",
      "patients": "রোগী",
      "doctors": "ডাক্তার",
      "wards": "ওয়ার্ড এবং বেড",
      "pharmacy": "ফার্মেসি",
      "records": "মেডিকেল রেকর্ড",
      "analytics": "বিশ্লেষণ",
      "users": "ব্যবহারকারী ব্যবস্থাপনা",
      "settings": "সেটিংস",
      "search": "অনুসন্ধান",
      "logout": "লগআউট",
      "ai_doctor": "এআই ডাক্তার সহকারী",
      "video_call": "ভিডিও কনফারেন্স",
      "contact_doctor": "ডাক্তারের সাথে যোগাযোগ করুন",
      "contact_patient": "রোগীর সাথে যোগাযোগ করুন",
      "type_message": "আপনার বার্তা লিখুন...",
      "type_medical_query": "আপনার মেডিকেল প্রশ্ন টাইপ করুন...",
      "language": "ভাষা",
      "system_status": "সিস্টেম স্ট্যাটাস: সচল",
      "initialize": "প্রোটোকল শুরু করুন",
      "request_access": "অ্যাক্সেস অনুরোধ করুন",
      "portal_login": "পোর্টাল লগইন",
      "ai_doctor_prompt": "আমি আপনার এআই মেডিকেল সহকারী। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
      "send": "পাঠান"
    }
  },
  zh: {
    translation: {
      "app_name": "AI MedFlow 协议",
      "welcome": "欢迎来到 AI MedFlow",
      "dashboard": "仪表板",
      "patients": "患者",
      "doctors": "医生",
      "wards": "病房和床位",
      "pharmacy": "药房",
      "records": "医疗记录",
      "analytics": "分析",
      "users": "用户管理",
      "settings": "设置",
      "search": "搜索",
      "logout": "登出",
      "ai_doctor": "AI 医生助手",
      "video_call": "视频会议",
      "contact_doctor": "联系医生",
      "contact_patient": "联系患者",
      "type_message": "输入您的消息...",
      "type_medical_query": "输入您的医疗查询...",
      "language": "语言",
      "system_status": "系统状态：正常运行",
      "initialize": "初始化协议",
      "request_access": "请求访问",
      "portal_login": "门户登录",
      "ai_doctor_prompt": "我是您的 AI 医疗助手。今天我能为您提供什么帮助？",
      "send": "发送"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
