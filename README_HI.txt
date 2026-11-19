LUCKY TECH WEBSITE - WINDOWS 11 SETUP

महत्वपूर्ण:
- यह शुरुआती प्रोजेक्ट है, अभी लाइव पेमेंट के लिए तैयार नहीं है।
- Razorpay अकाउंट और KYC अभिभावक की सहायता से/अकाउंट धारक की सही जानकारी के साथ पूरा करें।
- पहले Razorpay TEST keys से परीक्षण करें। असली पैसे लेने से पहले production approval, HTTPS hosting, webhook verification, order/payment status check और privacy/refund/contact जानकारी जोड़ें।
- WhatsApp invite link सर्वर की .env फाइल में रखें; इसे HTML या JavaScript में न डालें।
- QR code से स्कैन करके भेजे गए पेमेंट को यह वेबसाइट अपने आप verify नहीं करती। इस प्रोजेक्ट में Razorpay Checkout इस्तेमाल किया गया है।

WINDOWS 11:
1. Node.js LTS इंस्टॉल करें: https://nodejs.org/
2. इस ZIP को Extract करें।
3. Extract किए गए फोल्डर में address bar पर cmd लिखकर Enter दबाएँ।
4. ये commands चलाएँ:
   npm install
   copy .env.example .env
5. .env फाइल Notepad में खोलें और Razorpay TEST Key ID, TEST Key Secret तथा WhatsApp invite URL भरें।
6. टर्मिनल में चलाएँ:
   npm start
7. ब्राउज़र में खोलें: http://localhost:3000

Razorpay Dashboard से API keys लें; Secret को कभी किसी से साझा न करें और GitHub पर upload न करें।
लाइव करने से पहले backend में webhook और Razorpay API से payment status की server-side पुष्टि लागू/टेस्ट कराएँ।
