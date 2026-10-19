// English source text is also the fallback for content supplied by the API.
const rows = `
Language|भाषा|भाषा
Home|मुख्य पृष्ठ|मुख्यपृष्ठ
About|हमारे बारे में|आमच्याबद्दल
Blogs|लेख|लेख
Contact|संपर्क|संपर्क
Login|लॉग इन|लॉग इन
Sign Up|पंजीकरण|नोंदणी
Logout|लॉग आउट|लॉग आउट
Dashboard|डैशबोर्ड|डॅशबोर्ड
Krushi Gain Dashboard|कृषि गेन डैशबोर्ड|कृषी गेन डॅशबोर्ड
Smart mandi intelligence|स्मार्ट मंडी जानकारी|स्मार्ट बाजार माहिती
Logged in as|लॉग इन किया है|लॉग इन केले आहे
Farmer|किसान|शेतकरी
Overview|अवलोकन|आढावा
Profit Command Center|लाभ नियंत्रण केंद्र|नफा नियंत्रण केंद्र
Today's market window is active|आज का बाजार सक्रिय है|आजचा बाजार सक्रिय आहे
Smart Mandi Finder|स्मार्ट मंडी खोज|स्मार्ट बाजार शोध
Mandi Analysis|मंडी विश्लेषण|बाजार विश्लेषण
My History|मेरा इतिहास|माझा इतिहास
Profile|प्रोफ़ाइल|प्रोफाइल
Market Intelligence|बाजार की जानकारी|बाजाराची माहिती
Enter a crop name, compare current mandi prices, and choose the best selling option.|फसल का नाम डालें, ताज़ा मंडी भाव की तुलना करें और बिक्री का बेहतर विकल्प चुनें।|पिकाचे नाव टाका, ताज्या बाजारभावांची तुलना करा आणि विक्रीचा सर्वोत्तम पर्याय निवडा.
Crop Name|फसल का नाम|पिकाचे नाव
Crop|फसल|पीक
State|राज्य|राज्य
Sort By|क्रम चुनें|क्रम निवडा
Price: High to Low|भाव: अधिक से कम|भाव: जास्त ते कमी
Price: Low to High|भाव: कम से अधिक|भाव: कमी ते जास्त
Find Best Mandi|सबसे अच्छी मंडी खोजें|सर्वोत्तम बाजार शोधा
Finding...|खोज रहे हैं...|शोधत आहे...
Fetching latest mandi prices...|ताज़ा मंडी भाव ला रहे हैं...|ताजे बाजारभाव मिळवत आहे...
Please enter a crop name.|कृपया फसल का नाम डालें।|कृपया पिकाचे नाव टाका.
e.g. Tomato, Onion|उदा. Tomato, Onion|उदा. Tomato, Onion
Top 1 Best Mandi|सबसे अच्छी मंडी|सर्वोत्तम बाजार
Top 5 Best Mandis|शीर्ष 5 मंडियां|सर्वोत्तम 5 बाजार
Best modal price:|सर्वोत्तम प्रचलित भाव:|सर्वोत्तम सर्वसाधारण भाव:
Min:|न्यूनतम:|किमान:
Max:|अधिकतम:|कमाल:
Modal:|प्रचलित भाव:|सर्वसाधारण भाव:
Price Comparison|भाव की तुलना|भावांची तुलना
Search Again|फिर खोजें|पुन्हा शोधा
Ready for next search.|अगली खोज के लिए तैयार।|पुढील शोधासाठी तयार.
Send to WhatsApp|WhatsApp पर भेजें|WhatsApp वर पाठवा
Sending...|भेज रहे हैं...|पाठवत आहे...
Send Result on WhatsApp|नतीजा WhatsApp पर भेजें|निकाल WhatsApp वर पाठवा
Send to my WhatsApp|मेरे WhatsApp पर भेजें|माझ्या WhatsApp वर पाठवा
Share result on WhatsApp|WhatsApp पर नतीजा साझा करें|WhatsApp वर निकाल शेअर करा
Smart mandi result sent on WhatsApp.|मंडी का नतीजा WhatsApp पर भेज दिया गया।|बाजाराचा निकाल WhatsApp वर पाठवला.
Result sent on WhatsApp|नतीजा WhatsApp पर भेज दिया गया|निकाल WhatsApp वर पाठवला
Failed to send result on WhatsApp|WhatsApp पर नतीजा नहीं भेज पाए|WhatsApp वर निकाल पाठवता आला नाही
Failed to send smart mandi result on WhatsApp|मंडी का नतीजा WhatsApp पर नहीं भेज पाए|बाजाराचा निकाल WhatsApp वर पाठवता आला नाही
Something went wrong while fetching data.|जानकारी लाने में समस्या हुई।|माहिती मिळवताना अडचण आली.
Government mandi service is temporarily unavailable or timed out. Please try again shortly.|सरकारी मंडी सेवा अभी उपलब्ध नहीं है। कृपया थोड़ी देर बाद प्रयास करें।|सरकारी बाजार सेवा सध्या उपलब्ध नाही. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.
No data found for {commodity} in {state}.|{state} में {commodity} के भाव नहीं मिले।|{state} मध्ये {commodity} चे भाव सापडले नाहीत.
Showing top {count} mandis for {commodity} in {state}.|{state} में {commodity} की शीर्ष {count} मंडियां।|{state} मध्ये {commodity} साठी सर्वोत्तम {count} बाजार.
Manage your account information.|अपने खाते की जानकारी देखें।|तुमच्या खात्याची माहिती पहा.
Name|नाम|नाव
Email|ईमेल|ईमेल
Phone|फ़ोन|फोन
Phone Number|फ़ोन नंबर|फोन नंबर
Password|पासवर्ड|पासवर्ड
Confirm Password|पासवर्ड की पुष्टि करें|पासवर्ड पुन्हा टाका
Create Account|खाता बनाएं|खाते तयार करा
Creating account...|खाता बना रहे हैं...|खाते तयार होत आहे...
Already have an account?|पहले से खाता है?|आधीपासून खाते आहे?
New user?|नए उपयोगकर्ता?|नवीन वापरकर्ता?
Passwords do not match|पासवर्ड मेल नहीं खाते|पासवर्ड जुळत नाहीत
Signup failed|पंजीकरण नहीं हो पाया|नोंदणी झाली नाही
Login failed|लॉग इन नहीं हो पाया|लॉग इन झाले नाही
Use email/password or WhatsApp OTP|ईमेल/पासवर्ड या WhatsApp OTP इस्तेमाल करें|ईमेल/पासवर्ड किंवा WhatsApp OTP वापरा
OR|या|किंवा
Phone number (e.g. 919876543210)|फ़ोन नंबर (उदा. 919876543210)|फोन नंबर (उदा. 919876543210)
Send OTP|OTP भेजें|OTP पाठवा
Resend OTP|OTP फिर भेजें|OTP पुन्हा पाठवा
Resend OTP in {seconds}s|{seconds} सेकंड बाद OTP फिर भेजें|{seconds} सेकंदांनी OTP पुन्हा पाठवा
Verify OTP|OTP सत्यापित करें|OTP पडताळा
Sending OTP...|OTP भेज रहे हैं...|OTP पाठवत आहे...
Verifying OTP...|OTP सत्यापित कर रहे हैं...|OTP पडताळत आहे...
Logging in...|लॉग इन हो रहा है...|लॉग इन होत आहे...
Enter 6-digit OTP|6 अंकों का OTP डालें|6 अंकी OTP टाका
Please enter a valid 6-digit OTP|कृपया सही 6 अंकों का OTP डालें|कृपया योग्य 6 अंकी OTP टाका
Please enter your phone number with country code|देश कोड के साथ फ़ोन नंबर डालें|देशाच्या कोडसह फोन नंबर टाका
OTP sent successfully on WhatsApp|WhatsApp पर OTP भेज दिया गया|WhatsApp वर OTP पाठवला
Failed to send OTP|OTP नहीं भेज पाए|OTP पाठवता आला नाही
OTP verification failed|OTP सत्यापन असफल|OTP पडताळणी अयशस्वी
Login successful, redirecting...|लॉग इन सफल, आगे जा रहे हैं...|लॉग इन यशस्वी, पुढे जात आहे...
View your previous mandi analysis reports.|अपने पिछले मंडी विश्लेषण देखें।|तुमचे मागील बाजार विश्लेषण पहा.
Current Mandi|वर्तमान मंडी|सध्याचा बाजार
Recommended|सुझाव|शिफारस
Profit|लाभ|नफा
Date|तारीख|तारीख
Loading history...|इतिहास लोड हो रहा है...|इतिहास लोड होत आहे...
No analysis history found.|कोई विश्लेषण इतिहास नहीं मिला।|विश्लेषणाचा इतिहास सापडला नाही.
Enter crop and mandi details to compute expected profit.|अनुमानित लाभ के लिए फसल और मंडी की जानकारी डालें।|अपेक्षित नफा मोजण्यासाठी पीक आणि बाजाराची माहिती टाका.
Quantity|मात्रा|प्रमाण
Transport Cost per KM|प्रति किमी परिवहन खर्च|प्रति किमी वाहतूक खर्च
Analyze Profit|लाभ का विश्लेषण करें|नफ्याचे विश्लेषण करा
Analyzing...|विश्लेषण हो रहा है...|विश्लेषण होत आहे...
Analysis failed|विश्लेषण असफल|विश्लेषण अयशस्वी
Current Mandi Price|वर्तमान मंडी भाव|सध्याचा बाजारभाव
Predicted Price|अनुमानित भाव|अंदाजित भाव
Recommended Mandi|सुझाई गई मंडी|शिफारस केलेला बाजार
Distance|दूरी|अंतर
Transport Cost|परिवहन खर्च|वाहतूक खर्च
Expected Profit|अनुमानित लाभ|अपेक्षित नफा
Net Profit|शुद्ध लाभ|निव्वळ नफा
Predicted|अनुमानित|अंदाजित
Quintal|क्विंटल|क्विंटल
quintal|क्विंटल|क्विंटल
km|किमी|किमी
Tomato|टमाटर|टोमॅटो
Onion|प्याज़|कांदा
Wheat|गेहूँ|गहू
Soybean|सोयाबीन|सोयाबीन
Maharashtra|महाराष्ट्र|महाराष्ट्र
Mumbai|मुंबई|मुंबई
Pune|पुणे|पुणे
Nashik|नाशिक|नाशिक
Nagpur|नागपुर|नागपूर
Today Expected Profit|आज का अनुमानित लाभ|आजचा अपेक्षित नफा
Best Performing Crop|सबसे अच्छी फसल|सर्वोत्तम कामगिरी करणारे पीक
Mandis Tracked|निगरानी में मंडियां|मागोवा घेतलेले बाजार
Recommendation Accuracy|सुझाव की सटीकता|शिफारसीची अचूकता
Monitor profits, compare mandi opportunities, and plan smarter selling decisions.|लाभ देखें, मंडियों की तुलना करें और बेहतर बिक्री की योजना बनाएं।|नफा पहा, बाजारांची तुलना करा आणि चांगल्या विक्रीचे नियोजन करा.
Weekly Profit Trend|साप्ताहिक लाभ का रुझान|साप्ताहिक नफ्याचा कल
Last 7 days|पिछले 7 दिन|मागील 7 दिवस
Action Center|कार्य केंद्र|कृती केंद्र
Quick actions for daily operations.|रोज़ के कामों के लिए त्वरित विकल्प।|रोजच्या कामांसाठी झटपट पर्याय.
Start new mandi analysis|नया मंडी विश्लेषण शुरू करें|नवीन बाजार विश्लेषण सुरू करा
Review analysis history|पिछले विश्लेषण देखें|मागील विश्लेषण पहा
Update profile details|प्रोफ़ाइल की जानकारी देखें|प्रोफाइलची माहिती पहा
Recommendation|सुझाव|शिफारस
Tomato is trending higher in Mumbai today.|आज मुंबई में टमाटर का भाव बढ़ रहा है।|आज मुंबईत टोमॅटोचा भाव वाढत आहे.
Top Mandi Opportunities|बेहतरीन मंडी के अवसर|बाजारातील सर्वोत्तम संधी
Live snapshot|ताज़ा झलक|ताजी झलक
Mandi|मंडी|बाजार
Estimated Net Profit|अनुमानित शुद्ध लाभ|अंदाजित निव्वळ नफा
Mon|सोम|सोम
Tue|मंगल|मंगळ
Wed|बुध|बुध
Thu|गुरु|गुरु
Fri|शुक्र|शुक्र
Sat|शनि|शनि
Sun|रवि|रवि
+3 today|आज +3|आज +3
Empowering farmers with smart mandi decisions.|बेहतर मंडी फैसलों से किसानों को सशक्त बनाना।|योग्य बाजार निर्णयांनी शेतकऱ्यांना सक्षम करणे.
Discover the power of organic farming|जैविक खेती की ताकत जानें|सेंद्रिय शेतीचे सामर्थ्य जाणून घ्या
Grow with confidence, sell with better margins.|विश्वास से उगाएं, बेहतर लाभ पर बेचें।|आत्मविश्वासाने पिकवा, अधिक नफ्यात विका.
Compare mandis, estimate true profit, and plan smarter selling decisions for every harvest.|मंडियों की तुलना करें, असली लाभ जानें और हर फसल की बेहतर बिक्री की योजना बनाएं।|बाजारांची तुलना करा, खरा नफा मोजा आणि प्रत्येक हंगामाच्या विक्रीचे नियोजन करा.
Get started|शुरू करें|सुरू करा
Get Started|शुरू करें|सुरू करा
Learn more|और जानें|अधिक जाणून घ्या
Learn More|और जानें|अधिक जाणून घ्या
Today's best opportunity|आज का सबसे अच्छा अवसर|आजची सर्वोत्तम संधी
Tomato batch can earn +₹18,000 extra in Pune mandi|पुणे मंडी में टमाटर पर ₹18,000 अतिरिक्त मिल सकते हैं|पुणे बाजारात टोमॅटोला ₹18,000 अधिक मिळू शकतात
Trusted farmers|जुड़े किसान|विश्वास ठेवणारे शेतकरी
Mandis connected|जुड़ी मंडियां|जोडलेले बाजार
Avg uplift|औसत बढ़ोतरी|सरासरी वाढ
States covered|शामिल राज्य|समाविष्ट राज्ये
From soil to harvest|मिट्टी से फसल तक|मातीपासून कापणीपर्यंत
Healthy markets for healthy farming outcomes.|बेहतर खेती के लिए बेहतर बाजार।|समृद्ध शेतीसाठी चांगले बाजार.
Farmers should not lose profit due to information gaps. Our tools reveal where and when to sell based on clear data.|जानकारी की कमी से किसानों का लाभ कम नहीं होना चाहिए। हमारे साधन बताते हैं कि कहां और कब बेचना है।|माहितीअभावी शेतकऱ्यांचा नफा कमी होऊ नये. आमची साधने कुठे आणि कधी विकावे हे सांगतात.
Price visibility|भाव की पारदर्शिता|भावांची पारदर्शकता
Practical recommendations|उपयोगी सुझाव|उपयुक्त शिफारसी
Fast analysis|तेज़ विश्लेषण|जलद विश्लेषण
Seasonal intelligence|मौसम की जानकारी|हंगामाची माहिती
Discover profitable tools|लाभ बढ़ाने वाले साधन|नफा वाढवणारी साधने
Mandi Price Comparison|मंडी भाव की तुलना|बाजारभावांची तुलना
Compare crop prices in nearby mandis before you choose where to sell.|बेचने से पहले आसपास की मंडियों में भाव की तुलना करें।|विक्रीपूर्वी जवळच्या बाजारांतील भावांची तुलना करा.
Transport Cost Accuracy|परिवहन खर्च का सही अनुमान|वाहतूक खर्चाचा अचूक अंदाज
See final profit after logistics cost, not only mandi headline price.|परिवहन खर्च के बाद बचने वाला लाभ देखें।|वाहतूक खर्च वजा केल्यानंतरचा नफा पहा.
Smart Sell Timing|बेचने का सही समय|विक्रीची योग्य वेळ
Track trends and pick the right day and location for better returns.|बेहतर लाभ के लिए सही दिन और जगह चुनें।|अधिक नफ्यासाठी योग्य दिवस आणि ठिकाण निवडा.
Profit Snapshot|लाभ की झलक|नफ्याचा आढावा
Get clear numbers on expected gain, best route, and action steps.|अपेक्षित लाभ, सही रास्ता और आगे के कदम जानें।|अपेक्षित नफा, योग्य मार्ग आणि पुढील कृती जाणून घ्या.
Discover products|उत्पाद देखें|उत्पादने पहा
Organic Turmeric|जैविक हल्दी|सेंद्रिय हळद
Fresh Honey|ताज़ा शहद|ताजे मध
Dry Fruits Mix|सूखे मेवों का मिश्रण|सुकामेव्याचे मिश्रण
Green Vegetables|हरी सब्ज़ियां|हिरव्या भाज्या
Rating|रेटिंग|गुणांकन
How we bring better outcomes|हम बेहतर परिणाम कैसे लाते हैं|आम्ही चांगले परिणाम कसे मिळवतो
Add your crop details|फसल की जानकारी डालें|पिकाची माहिती टाका
Enter crop quantity, current mandi and expected transport distance.|फसल की मात्रा, वर्तमान मंडी और परिवहन की दूरी डालें।|पिकाचे प्रमाण, सध्याचा बाजार आणि वाहतुकीचे अंतर टाका.
Compare mandi results|मंडियों के नतीजों की तुलना करें|बाजारांच्या निकालांची तुलना करा
The platform shows rate differences and net payout estimates.|मंच भाव का अंतर और शुद्ध आय का अनुमान दिखाता है।|अॅप भावातील फरक आणि निव्वळ उत्पन्नाचा अंदाज दाखवते.
Pick best selling route|बिक्री का सही रास्ता चुनें|विक्रीचा सर्वोत्तम मार्ग निवडा
Choose mandi with strongest final margin and practical travel time.|अच्छे लाभ और सुविधाजनक दूरी वाली मंडी चुनें।|अधिक नफा आणि सोयीचे अंतर असलेला बाजार निवडा.
Track earnings history|कमाई का इतिहास देखें|कमाईचा इतिहास पहा
Review outcomes and improve selling strategy in future cycles.|नतीजे देखें और अगले हंगाम की बिक्री बेहतर बनाएं।|निकाल पहा आणि पुढील हंगामाची विक्री सुधारा.
Enjoy consistent value with simple plans|सरल योजनाओं का लाभ लें|सोप्या योजनांचा लाभ घ्या
Basic Farmer Plan|बुनियादी किसान योजना|मूलभूत शेतकरी योजना
Smart Growth Plan|स्मार्ट विकास योजना|स्मार्ट विकास योजना
FPO / Group Plan|FPO / समूह योजना|FPO / गट योजना
Price comparison|भाव की तुलना|भावांची तुलना
3 analyses per day|रोज़ 3 विश्लेषण|दररोज 3 विश्लेषणे
Simple profit summary|लाभ का सरल सारांश|नफ्याचा सोपा आढावा
Unlimited analyses|असीमित विश्लेषण|अमर्याद विश्लेषणे
Transport-adjusted recommendations|परिवहन खर्च सहित सुझाव|वाहतूक खर्चासह शिफारसी
Priority support|प्राथमिकता से सहायता|प्राधान्याने मदत
Multi-user access|कई उपयोगकर्ताओं के लिए|अनेक वापरकर्त्यांसाठी
Shared dashboard|साझा डैशबोर्ड|सामायिक डॅशबोर्ड
Bulk crop intelligence|बड़ी मात्रा में फसल की जानकारी|मोठ्या प्रमाणातील पिकांची माहिती
Simple, clear answers|सरल और स्पष्ट उत्तर|सोपी आणि स्पष्ट उत्तरे
How does the platform calculate profit?|लाभ की गणना कैसे होती है?|नफा कसा मोजला जातो?
It combines mandi price, quantity and estimated transport impact to show net return.|मंडी भाव, मात्रा और परिवहन खर्च से शुद्ध लाभ निकाला जाता है।|बाजारभाव, प्रमाण आणि वाहतूक खर्चावरून निव्वळ नफा मोजला जातो.
Can I use it for multiple crops?|क्या मैं कई फसलों के लिए इस्तेमाल कर सकता हूं?|मी अनेक पिकांसाठी वापरू शकतो का?
Yes, you can run separate analyses for each crop and compare opportunities quickly.|हां, हर फसल का अलग विश्लेषण करके तुलना कर सकते हैं।|होय, प्रत्येक पिकाचे स्वतंत्र विश्लेषण करून तुलना करू शकता.
Is this useful for small farmers?|क्या छोटे किसानों के लिए उपयोगी है?|लहान शेतकऱ्यांसाठी उपयुक्त आहे का?
Yes. Even small price improvements across a season can significantly improve income.|हां, भाव में छोटी बढ़ोतरी भी पूरे मौसम की आय बढ़ा सकती है।|होय, भावातील थोडी वाढही संपूर्ण हंगामाचे उत्पन्न वाढवू शकते.
Do I need technical knowledge?|क्या तकनीकी जानकारी चाहिए?|तांत्रिक ज्ञान आवश्यक आहे का?
No. The interface is simple and focused on clear recommendations in plain language.|नहीं, यह सरल भाषा में स्पष्ट सुझाव देता है।|नाही, येथे सोप्या भाषेत स्पष्ट शिफारसी मिळतात.
Dive into educational reads|जानकारीपूर्ण लेख पढ़ें|माहितीपूर्ण लेख वाचा
Read more|और पढ़ें|पुढे वाचा
Read More|और पढ़ें|पुढे वाचा
How to read mandi trends before selling|बेचने से पहले मंडी के रुझान कैसे समझें|विक्रीपूर्वी बाजारातील कल कसा समजून घ्यावा
Transport planning that protects crop margin|लाभ बचाने वाली परिवहन योजना|नफा जपणारे वाहतूक नियोजन
Data-first decisions for the next harvest|अगली फसल के लिए आंकड़ों पर आधारित निर्णय|पुढील हंगामासाठी माहितीवर आधारित निर्णय
About our mission|हमारे उद्देश्य के बारे में|आमच्या ध्येयाबद्दल
From soil to selling, we help farmers earn better.|खेती से बिक्री तक, हम किसानों की कमाई बढ़ाने में मदद करते हैं।|शेतीपासून विक्रीपर्यंत, आम्ही शेतकऱ्यांचे उत्पन्न वाढवण्यास मदत करतो.
Krushi Gain helps growers compare mandi prices, estimate transport impact, and choose the location that gives the best final return instead of guessing.|कृषि गेन मंडी भाव और परिवहन खर्च की तुलना से बेहतर लाभ वाली मंडी चुनने में मदद करता है।|कृषी गेन बाजारभाव आणि वाहतूक खर्चाची तुलना करून अधिक नफा देणारा बाजार निवडण्यास मदत करते.
Mandis monitored|निगरानी में मंडियां|मागोवा घेतलेले बाजार
Avg extra profit|औसत अतिरिक्त लाभ|सरासरी अतिरिक्त नफा
Daily analyses|दैनिक विश्लेषण|दैनिक विश्लेषणे
Farmer trust score|किसानों का विश्वास स्कोर|शेतकऱ्यांचा विश्वास गुणांक
What drives our platform|हमारे मंच की प्रेरणा|आमच्या अॅपची प्रेरणा
We focus on clear, useful intelligence that farmers can trust in real market situations.|हम स्पष्ट और उपयोगी जानकारी देते हैं जिस पर किसान भरोसा कर सकें।|शेतकऱ्यांना विश्वास ठेवता येईल अशी स्पष्ट आणि उपयुक्त माहिती आम्ही देतो.
Farmer First|किसान सबसे पहले|शेतकरी प्रथम
Every workflow is built to save farmer time and improve real take-home profit.|हर सुविधा किसान का समय बचाने और वास्तविक लाभ बढ़ाने के लिए है।|प्रत्येक सुविधा शेतकऱ्यांचा वेळ वाचवण्यासाठी आणि प्रत्यक्ष नफा वाढवण्यासाठी आहे.
Data Driven|आंकड़ों पर आधारित|माहितीवर आधारित
Price recommendations are based on mandi trends, seasonality, and transport impact.|भाव के सुझाव मंडी के रुझान, मौसम और परिवहन पर आधारित हैं।|भावाच्या शिफारसी बाजारातील कल, हंगाम आणि वाहतुकीवर आधारित आहेत.
Practical Advice|व्यावहारिक सलाह|व्यावहारिक सल्ला
Simple decisions, clear numbers, and actions that can be applied on the same day.|सरल फैसले, स्पष्ट आंकड़े और तुरंत अपनाए जा सकने वाले कदम।|सोपे निर्णय, स्पष्ट आकडे आणि लगेच करता येणाऱ्या कृती.
Committed to rural growth|ग्रामीण विकास के लिए प्रतिबद्ध|ग्रामीण विकासासाठी वचनबद्ध
Our goal is to make mandi planning simple and accessible, so farmers can increase confidence in selling decisions and protect seasonal income.|हमारा उद्देश्य मंडी की योजना आसान बनाना है ताकि किसान आत्मविश्वास से बेच सकें और आय सुरक्षित रखें।|बाजाराचे नियोजन सोपे करणे हे आमचे ध्येय आहे, जेणेकरून शेतकरी आत्मविश्वासाने विक्री करून उत्पन्न जपू शकतील.
Real-time comparisons between nearby mandis|आसपास की मंडियों की ताज़ा तुलना|जवळच्या बाजारांची ताजी तुलना
Profit views with transport-adjusted outcomes|परिवहन खर्च के बाद का लाभ|वाहतूक खर्चानंतरचा नफा
Actionable recommendations in simple language|सरल भाषा में उपयोगी सुझाव|सोप्या भाषेत उपयुक्त शिफारसी
Meet the team|हमारी टीम से मिलें|आमच्या टीमला भेटा
Engineers and analysts building practical tools for farmers.|किसानों के लिए उपयोगी साधन बनाने वाले इंजीनियर और विश्लेषक।|शेतकऱ्यांसाठी उपयुक्त साधने बनवणारे अभियंते आणि विश्लेषक.
Product Lead|उत्पाद प्रमुख|उत्पादन प्रमुख
Data Scientist|डेटा वैज्ञानिक|डेटा वैज्ञानिक
Market Analyst|बाजार विश्लेषक|बाजार विश्लेषक
Farmer Outreach|किसान संपर्क|शेतकरी संपर्क
Our promise|हमारा वादा|आमचे वचन
Better decisions for every harvest season.|हर फसल के मौसम के लिए बेहतर फैसले।|प्रत्येक हंगामासाठी अधिक चांगले निर्णय.
We continue improving the platform so every farmer can confidently pick the mandi that delivers the highest net return.|हम मंच को बेहतर बना रहे हैं ताकि हर किसान अधिक लाभ वाली मंडी चुन सके।|प्रत्येक शेतकऱ्याला अधिक नफा देणारा बाजार निवडता यावा यासाठी आम्ही अॅप सुधारत आहोत.
Contact Us|हमसे संपर्क करें|आमच्याशी संपर्क करा
Let's grow together|आइए साथ आगे बढ़ें|चला एकत्र प्रगती करूया
Home / Contact|मुख्य पृष्ठ / संपर्क|मुख्यपृष्ठ / संपर्क
Get In Touch|संपर्क करें|संपर्क करा
Let's talk about fresh, healthy, and sustainable farming|ताज़ी, स्वस्थ और टिकाऊ खेती पर बात करें|ताज्या, आरोग्यदायी आणि शाश्वत शेतीबद्दल बोलूया
Share your crop, mandi, or pricing questions and we'll guide you with clear next steps.|फसल, मंडी या भाव के सवाल पूछें, हम मार्गदर्शन करेंगे।|पीक, बाजार किंवा भावाबद्दल प्रश्न विचारा, आम्ही मार्गदर्शन करू.
Phone Number *|फ़ोन नंबर *|फोन नंबर *
Email Address|ईमेल पता|ईमेल पत्ता
Email Address *|ईमेल पता *|ईमेल पत्ता *
First Name *|पहला नाम *|नाव *
Last Name *|उपनाम *|आडनाव *
Any Additional Message...|अन्य संदेश...|अतिरिक्त संदेश...
Send Message ↗|संदेश भेजें ↗|संदेश पाठवा ↗
How to reach us|हम तक कैसे पहुंचें|आमच्यापर्यंत कसे पोहोचाल
Mon to Sat, 8 AM - 7 PM|सोम से शनि, सुबह 8 - शाम 7|सोम ते शनि, सकाळी 8 - सायं. 7
Replies within 24 hours|24 घंटे में जवाब|24 तासांत उत्तर
We're here to help with mandi planning and farm visits|मंडी योजना और खेत के दौरों में सहायता के लिए हम उपलब्ध हैं|बाजार नियोजन आणि शेतभेटीसाठी आम्ही मदत करतो
From crop planning to mandi-level profit optimization, our team is ready to support your next decision.|फसल की योजना से मंडी में बेहतर लाभ तक हमारी टीम आपके साथ है।|पीक नियोजनापासून बाजारातील अधिक नफ्यापर्यंत आमची टीम तुमच्या सोबत आहे.
Mandi price clarification|मंडी भाव की जानकारी|बाजारभावाची माहिती
Dashboard and login support|डैशबोर्ड और लॉग इन सहायता|डॅशबोर्ड आणि लॉग इन मदत
Partnership and field outreach|साझेदारी और क्षेत्रीय संपर्क|भागीदारी आणि क्षेत्रीय संपर्क
Product demo for FPOs|FPO के लिए उत्पाद प्रदर्शन|FPO साठी अॅप प्रात्यक्षिक
Our Blog|हमारे लेख|आमचे लेख
Home / Blog|मुख्य पृष्ठ / लेख|मुख्यपृष्ठ / लेख
Fresh stories from the field|खेतों से ताज़ा कहानियां|शेतातील ताज्या गोष्टी
Blog Detail|लेख का विवरण|लेखाचा तपशील
Close|बंद करें|बंद करा
Loading...|लोड हो रहा है...|लोड होत आहे...
Please wait...|कृपया प्रतीक्षा करें...|कृपया थांबा...
Analyzing Mandi Prices...|मंडी भाव का विश्लेषण हो रहा है...|बाजारभावांचे विश्लेषण होत आहे...
Back to Home|मुख्य पृष्ठ पर जाएं|मुख्यपृष्ठावर जा
The page you are looking for does not exist.|यह पृष्ठ उपलब्ध नहीं है।|हे पृष्ठ उपलब्ध नाही.
The True Benefits of Choosing Organic for Your Family|परिवार के लिए जैविक खेती के असली लाभ|कुटुंबासाठी सेंद्रिय शेतीचे खरे फायदे
Organic farming protects your family from harmful residues while preserving soil vitality for long-term productivity. With better crop diversity and cleaner practices, farms can produce healthier food and stronger local ecosystems.|जैविक खेती हानिकारक अवशेषों से परिवार की रक्षा करती है और मिट्टी की उर्वरता बनाए रखती है। फसल विविधता और स्वच्छ तरीकों से स्वस्थ भोजन और बेहतर पर्यावरण मिलता है।|सेंद्रिय शेती कुटुंबाचे हानिकारक अवशेषांपासून संरक्षण करते आणि मातीची सुपीकता टिकवते. पीक विविधता आणि स्वच्छ पद्धतींमुळे आरोग्यदायी अन्न आणि चांगले पर्यावरण मिळते.
Bringing Traditional Farming Wisdom Into Modern Agriculture|आधुनिक खेती में पारंपरिक ज्ञान का उपयोग|आधुनिक शेतीत पारंपरिक ज्ञानाचा वापर
Blending age-old crop rotation, local seed knowledge, and modern data tools helps farmers reduce risk and increase yield stability. This approach keeps farming rooted in tradition while improving decisions with real-time insight.|पारंपरिक फसल चक्र, स्थानीय बीज और आधुनिक जानकारी मिलकर जोखिम घटाते हैं और पैदावार स्थिर रखते हैं। ताज़ा जानकारी से बेहतर फैसले लिए जा सकते हैं।|पारंपरिक पीक फेरपालट, स्थानिक बियाणे आणि आधुनिक माहिती यांच्या वापराने जोखीम कमी होते आणि उत्पादन स्थिर राहते. ताज्या माहितीमुळे योग्य निर्णय घेता येतात.
Natural Pest Control That Protects Both Crops and Nature|फसल और प्रकृति की रक्षा करने वाला प्राकृतिक कीट नियंत्रण|पीक आणि निसर्ग जपणारे नैसर्गिक कीड नियंत्रण
Natural pest management methods like trap crops, neem-based sprays, and biodiversity buffers reduce chemical dependence. They preserve beneficial insects and create a healthier balance between productivity and sustainability.|सापळा फसल, नीम के छिड़काव और जैव विविधता से रसायनों पर निर्भरता घटती है। उपयोगी कीट सुरक्षित रहते हैं और उत्पादन व पर्यावरण का संतुलन बनता है।|सापळा पिके, कडुनिंबाची फवारणी आणि जैवविविधतेमुळे रसायनांवरील अवलंबित्व कमी होते. उपयुक्त कीटक सुरक्षित राहतात आणि उत्पादन व पर्यावरणाचा समतोल राखला जातो.
A Complete Guide to Growing Seasonal Fruits and Vegetables|मौसमी फल और सब्ज़ियां उगाने की मार्गदर्शिका|हंगामी फळे आणि भाज्या पिकवण्याचे मार्गदर्शन
Seasonal planning improves quality and market value while reducing input costs. Understanding local climate windows and market demand helps farmers decide what to plant, when to harvest, and where to sell for the best return.|मौसम के अनुसार योजना से गुणवत्ता और बाजार मूल्य बढ़ता है तथा लागत घटती है। स्थानीय मौसम और मांग समझकर किसान सही फसल, कटाई का समय और बाजार चुन सकते हैं।|हंगामानुसार नियोजन केल्याने गुणवत्ता आणि बाजारमूल्य वाढते व खर्च कमी होतो. स्थानिक हवामान आणि मागणी समजून शेतकरी योग्य पीक, कापणीची वेळ आणि बाजार निवडू शकतात.
Behind the Scenes: Ensuring Freshness from Farm to Your Home|खेत से घर तक ताज़गी कैसे बनी रहती है|शेतापासून घरापर्यंत ताजेपणा कसा टिकतो
Fresh produce quality depends on efficient post-harvest handling, transport timing, and storage care. Small improvements in sorting, packaging, and dispatch can significantly reduce wastage and improve farmer income.|ताज़ा उपज की गुणवत्ता कटाई के बाद की देखभाल, परिवहन और भंडारण पर निर्भर है। छंटाई, पैकिंग और भेजने के तरीके में छोटे सुधार से नुकसान घटता है और आय बढ़ती है।|ताज्या मालाची गुणवत्ता कापणीनंतरची हाताळणी, वाहतूक आणि साठवणुकीवर अवलंबून असते. वर्गीकरण, पॅकिंग आणि पाठवण्याच्या पद्धतीत सुधारणा केल्यास नुकसान कमी होते व उत्पन्न वाढते.
Sustainable Farming Practices Every Small Farmer Should Know|छोटे किसानों के लिए टिकाऊ खेती के तरीके|लहान शेतकऱ्यांसाठी शाश्वत शेतीच्या पद्धती
Water-smart irrigation, soil health monitoring, and low-input crop protection are practical steps that small farmers can adopt quickly. These methods increase resilience and support stable profits across changing seasons.|पानी बचाने वाली सिंचाई, मिट्टी की जांच और कम लागत वाला फसल संरक्षण छोटे किसान आसानी से अपना सकते हैं। इनसे बदलते मौसम में भी खेती मजबूत और लाभ स्थिर रहता है।|पाणी वाचवणारे सिंचन, मातीची तपासणी आणि कमी खर्चाचे पीक संरक्षण लहान शेतकरी सहज स्वीकारू शकतात. यामुळे बदलत्या हंगामातही शेती टिकाऊ आणि नफा स्थिर राहतो.
Committed to quality|गुणवत्ता के लिए प्रतिबद्ध|गुणवत्तेसाठी वचनबद्ध
Reliable decisions for every season|हर मौसम में भरोसेमंद फैसले|प्रत्येक हंगामात विश्वासार्ह निर्णय
We blend agri-market data with practical planning so each selling decision is more predictable.|हम कृषि बाजार की जानकारी और व्यावहारिक योजना से बिक्री के फैसले आसान बनाते हैं।|कृषी बाजाराची माहिती आणि व्यावहारिक नियोजन वापरून आम्ही विक्रीचे निर्णय सोपे करतो.
Daily market refresh|रोज़ ताज़ा बाजार जानकारी|दररोज ताजी बाजार माहिती
Recommendation confidence|सुझाव पर भरोसा|शिफारसीवरील विश्वास
Avg decision time|औसत निर्णय समय|निर्णयासाठी सरासरी वेळ
Ready to maximize your mandi profits?|मंडी का लाभ बढ़ाने के लिए तैयार हैं?|बाजारातील नफा वाढवण्यासाठी तयार आहात?
Start a smart analysis in seconds and discover the best market to sell your crop for higher net returns.|कुछ सेकंड में विश्लेषण करें और अधिक लाभ देने वाला बाजार खोजें।|काही सेकंदांत विश्लेषण करा आणि अधिक नफा देणारा बाजार शोधा.
Create Free Account|मुफ़्त खाता बनाएं|मोफत खाते तयार करा
Field Readiness|खेत की तैयारी|शेताची तयारी
Farmers capture crop health and expected yield before mandi planning.|मंडी की योजना से पहले किसान फसल की स्थिति और पैदावार का अनुमान देखते हैं।|बाजाराचे नियोजन करण्यापूर्वी शेतकरी पिकाची स्थिती आणि उत्पादनाचा अंदाज पाहतात.
Smart Harvest Selling|फसल की स्मार्ट बिक्री|पिकाची स्मार्ट विक्री
Market-linked decisions help maximize returns at the right mandi.|बाजार की जानकारी से सही मंडी में अधिक लाभ मिलता है।|बाजाराच्या माहितीमुळे योग्य ठिकाणी अधिक नफा मिळतो.
Data-Driven Growth|आंकड़ों से विकास|माहितीवर आधारित विकास
Technology empowers villages with transparent pricing insights.|तकनीक गांवों को भाव की स्पष्ट जानकारी देती है।|तंत्रज्ञान गावांना भावांची पारदर्शक माहिती देते.
Built for Real Farmers|किसानों के लिए बनाया गया|शेतकऱ्यांसाठी बनवलेले
From field to market, every decision is supported with live pricing and profit-focused analysis.|खेत से बाजार तक, हर फैसले में ताज़ा भाव और लाभ का विश्लेषण साथ है।|शेतापासून बाजारापर्यंत, प्रत्येक निर्णयासाठी ताजे भाव आणि नफ्याचे विश्लेषण सोबत आहे.
Smart Agri Intelligence|स्मार्ट कृषि जानकारी|स्मार्ट कृषी माहिती
A smart platform that helps farmers maximize their crop profits by finding the best mandi using price comparison and smart analysis.|भाव की तुलना और विश्लेषण से सही मंडी चुनकर किसानों का लाभ बढ़ाने वाला स्मार्ट मंच।|भावांची तुलना आणि विश्लेषणातून योग्य बाजार निवडून शेतकऱ्यांचा नफा वाढवणारे स्मार्ट अॅप.
Avg Profit Uplift|औसत लाभ वृद्धि|सरासरी नफ्यात वाढ
Analysis Speed|विश्लेषण की गति|विश्लेषणाचा वेग
Farmer Success Story|किसान की सफलता की कहानी|शेतकऱ्याची यशोगाथा
"Data-based mandi selection increased my net returns this season."|"जानकारी के आधार पर मंडी चुनने से इस मौसम में मेरा लाभ बढ़ा।"|"माहितीच्या आधारे बाजार निवडल्याने या हंगामात माझा नफा वाढला."
Current mandi value|वर्तमान मंडी का मूल्य|सध्याच्या बाजारातील मूल्य
Best mandi value|सर्वोत्तम मंडी का मूल्य|सर्वोत्तम बाजारातील मूल्य
Estimated extra profit|अनुमानित अतिरिक्त लाभ|अंदाजित अतिरिक्त नफा
Suggested action: Route Tomato stock to Mumbai mandi this week.|सुझाव: इस सप्ताह टमाटर मुंबई मंडी भेजें।|शिफारस: या आठवड्यात टोमॅटो मुंबई बाजारात पाठवा.
How It Works|यह कैसे काम करता है|हे कसे काम करते
Farmer selects crop and current mandi.|किसान फसल और वर्तमान मंडी चुनता है।|शेतकरी पीक आणि सध्याचा बाजार निवडतो.
System collects mandi price data.|प्रणाली मंडी भाव की जानकारी जुटाती है।|प्रणाली बाजारभावांची माहिती गोळा करते.
Machine learning predicts prices.|मशीन लर्निंग भाव का अनुमान लगाती है।|मशीन लर्निंग भावाचा अंदाज लावते.
Nearby mandis are compared.|आसपास की मंडियों की तुलना होती है।|जवळच्या बाजारांची तुलना होते.
Best mandi recommendation is generated.|सबसे अच्छी मंडी का सुझाव मिलता है।|सर्वोत्तम बाजाराची शिफारस मिळते.
Live Market Pulse|ताज़ा बाजार की स्थिति|ताजी बाजार स्थिती
Track high-potential mandi opportunities and act quickly when profits peak.|अच्छे अवसर देखें और सही समय पर बिक्री करें।|चांगल्या संधी पहा आणि योग्य वेळी विक्री करा.
Top Mandi|शीर्ष मंडी|सर्वोत्तम बाजार
Profit confidence|लाभ पर भरोसा|नफ्यावरील विश्वास
Contact Us Today|आज ही संपर्क करें|आजच संपर्क करा
Farmer harvesting fresh vegetables|ताज़ी सब्ज़ियों की कटाई करता किसान|ताज्या भाज्यांची कापणी करणारा शेतकरी
Farm background for blogs page|लेखों के पीछे खेत का दृश्य|लेखांच्या मागे शेताचे दृश्य
Farmers working in crop rows|फसल की कतारों में काम करते किसान|पिकांच्या ओळींत काम करणारे शेतकरी
Team working in farm|खेत में काम करती टीम|शेतात काम करणारी टीम
Office location map|कार्यालय का नक्शा|कार्यालयाचा नकाशा
Organic farming field|जैविक खेती का खेत|सेंद्रिय शेतीचे शेत
Farmer carrying fresh produce|ताज़ी उपज ले जाता किसान|ताजा शेतमाल नेणारा शेतकरी
Farmer sorting vegetables|सब्ज़ियां छांटता किसान|भाज्या निवडणारा शेतकरी
Farmer in crop field|खेत में किसान|शेतातील शेतकरी
Farmer in field|खेत में किसान|शेतातील शेतकरी
All fields are required|सभी जानकारी भरें|सर्व माहिती भरा
Email already registered|ईमेल पहले से पंजीकृत है|ईमेल आधीच नोंदणीकृत आहे
Email and password are required|ईमेल और पासवर्ड डालें|ईमेल आणि पासवर्ड टाका
Invalid credentials|ईमेल या पासवर्ड गलत है|ईमेल किंवा पासवर्ड चुकीचा आहे
Enter a valid phone number with country code|देश कोड के साथ सही फ़ोन नंबर डालें|देशाच्या कोडसह योग्य फोन नंबर टाका
Phone number and OTP are required|फ़ोन नंबर और OTP डालें|फोन नंबर आणि OTP टाका
OTP not found or already used|OTP नहीं मिला या पहले इस्तेमाल हो चुका है|OTP सापडला नाही किंवा आधी वापरला आहे
OTP expired. Please request a new OTP|OTP की अवधि समाप्त। नया OTP मांगें|OTP ची मुदत संपली. नवीन OTP मागवा
Invalid OTP|गलत OTP|चुकीचा OTP
Valid WhatsApp phone number is required|सही WhatsApp नंबर डालें|योग्य WhatsApp नंबर टाका
Valid WhatsApp phone number is required in user profile|प्रोफ़ाइल में सही WhatsApp नंबर चाहिए|प्रोफाइलमध्ये योग्य WhatsApp नंबर आवश्यक आहे
₹99/month|₹99/माह|₹99/महिना
₹199/month|₹199/माह|₹199/महिना
₹699/month|₹699/माह|₹699/महिना
<10 sec|<10 सेकंड|<10 सेकंद
< 10 sec|< 10 सेकंड|< 10 सेकंद
110 km|110 किमी|110 किमी
45 km|45 किमी|45 किमी
160 km|160 किमी|160 किमी
Mandi API key was rejected. Configure a valid DATA_GOV_API_KEY in backend/.env and restart the backend.|मंडी API key अस्वीकार हुई। backend/.env में सही DATA_GOV_API_KEY डालकर backend फिर शुरू करें।|बाजाराची API key नाकारली. backend/.env मध्ये योग्य DATA_GOV_API_KEY टाकून backend पुन्हा सुरू करा.
Mandi dataset was not found. Check DATA_GOV_RESOURCE_ID in backend/.env.|मंडी की जानकारी नहीं मिली। backend/.env में DATA_GOV_RESOURCE_ID जांचें।|बाजाराची माहिती सापडली नाही. backend/.env मधील DATA_GOV_RESOURCE_ID तपासा.
How technology is transforming agriculture|तकनीक खेती को कैसे बदल रही है|तंत्रज्ञान शेतीत कसा बदल घडवत आहे
Digital tools, satellite imaging, and smart analytics are enabling farmers to make better production and selling decisions.|डिजिटल साधन, उपग्रह चित्र और स्मार्ट विश्लेषण किसानों को उत्पादन और बिक्री के बेहतर फैसले लेने में मदद करते हैं।|डिजिटल साधने, उपग्रह चित्रे आणि स्मार्ट विश्लेषण शेतकऱ्यांना उत्पादन आणि विक्रीचे अधिक चांगले निर्णय घेण्यास मदत करतात.
Understanding mandi price fluctuations|मंडी भाव के उतार-चढ़ाव को समझें|बाजारभावातील चढउतार समजून घ्या
Seasonal demand, weather, supply chain disruptions, and local market dynamics cause mandi prices to vary widely.|मौसमी मांग, मौसम, आपूर्ति में बाधाएं और स्थानीय बाजार की स्थिति से मंडी भाव में बदलाव होता है।|हंगामी मागणी, हवामान, पुरवठ्यातील अडथळे आणि स्थानिक बाजाराच्या स्थितीमुळे बाजारभाव बदलतात.
Smart selling strategies for farmers|किसानों के लिए स्मार्ट बिक्री के तरीके|शेतकऱ्यांसाठी स्मार्ट विक्रीच्या पद्धती
Compare multiple mandis, estimate logistics, and time your sale to improve net profits consistently.|कई मंडियों की तुलना करें, परिवहन खर्च का अनुमान लगाएं और सही समय पर बेचकर शुद्ध लाभ बढ़ाएं।|अनेक बाजारांची तुलना करा, वाहतूक खर्चाचा अंदाज घ्या आणि योग्य वेळी विक्री करून निव्वळ नफा वाढवा.
`;
export const translations = Object.fromEntries(rows.trim().split('\n').map(row => {
  const [en, hi, mr] = row.split('|');
  return [en, { hi, mr }];
}));
export function translate(language, text, params = {}) {
  if (typeof text !== 'string') return text;
  const translated = translations[text]?.[language] || text;
  return translated.replace(/\{(\w+)\}/g, (match, key) => params[key] ?? match);
}
