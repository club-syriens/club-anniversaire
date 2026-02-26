// ─── SEED DATA ────────────────────────────────────────────────────────────────
// Données initiales si Google Sheets est vide au premier lancement
// ─────────────────────────────────────────────────────────────────────────────

function seedData() {
  window.S.tasks = [
    {id:1,ar:"تحديد جميع التكاليف اللازمة لانجاز الحفل من خلال عروض الاسعار",fr:"Identifier tous les coûts via devis",dept:"الشؤون المالية",owner:"Mona",vols:"",date:"",status:"غير منجز",notes:""},
    {id:2,ar:"تحديد سعر الحجز",fr:"Fixer le prix du ticket (25€ envisagé)",dept:"الشؤون المالية",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:3,ar:"تحديد هامش الربح الناتج من الحفل ان أمكن",fr:"Calculer la marge bénéficiaire potentielle",dept:"الشؤون المالية",owner:"Yassr",vols:"",date:"",status:"غير منجز",notes:""},
    {id:4,ar:"دراسة الميزانية بشكل كامل",fr:"Étude complète du budget",dept:"الشؤون المالية",owner:"Yassr",vols:"",date:"",status:"غير منجز",notes:""},
    {id:5,ar:"تصميم الاعلان عن الحفل للسوشيال ميديا",fr:"Créer les annonces (posts & vidéos) pour les réseaux sociaux",dept:"شؤون التواصل الداخلي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:6,ar:"تصميم الرسائل الخاصة لدعوة أعضاء النادي",fr:"Rédiger les invitations personnalisées aux membres",dept:"شؤون التواصل الداخلي",owner:"Nour",vols:"",date:"",status:"غير منجز",notes:""},
    {id:7,ar:"تصميم خطة ومنهجية لارسال الدعوات",fr:"Planifier l'envoi des invitations (avec dept. Data)",dept:"شؤون التواصل الداخلي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:8,ar:"تصميم استبيان ما بعد الحفل",fr:"Créer le questionnaire post-événement",dept:"شؤون التواصل الداخلي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:9,ar:"ارسال استبيان مابعد الحفل لكل المشاركين",fr:"Envoyer le questionnaire à tous les participants",dept:"شؤون التواصل الداخلي",owner:"",vols:"",date:"2026-03-30",status:"غير منجز",notes:"Après l'événement"},
    {id:10,ar:"تصميم بوستر ستاند النادي",fr:"Créer le poster du stand du club",dept:"شؤون التواصل الداخلي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:11,ar:"تصميم صفحة الانضمام للنادي",fr:"Concevoir la page d'adhésion au club",dept:"شؤون التواصل الداخلي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:12,ar:"تصميم فيديو النادي الذي سيعرض في الحفل",fr:"Produire la vidéo du club (à projeter pendant l'événement)",dept:"شؤون التواصل الداخلي",owner:"Yahya, Iman",vols:"Yahya,Iman",date:"2026-03-20",status:"غير منجز",notes:""},
    {id:13,ar:"التواصل مع الصالات والتفاوض على الاسعار",fr:"Contacter les salles et négocier les prix",dept:"شؤون التواصل الخارجي",owner:"",vols:"Gufran",date:"",status:"قيد الانجاز",notes:"Gufran en charge"},
    {id:14,ar:"التواصل مع الفنانين والتفاوض على المحتوى والتكلفة",fr:"Contacter les artistes (musique & stand-up)",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:"Cachet 100-200€"},
    {id:15,ar:"التواصل مع المشاركين بعرض ستاند",fr:"Contacter les exposants pour les stands",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:16,ar:"التواصل مع Photobooth",fr:"Contacter le prestataire Photo Booth",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:17,ar:"تصميم كلمة ترحيب الحفل",fr:"Rédiger le discours d'accueil",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:18,ar:"تصميم كلمة لشكر المتطوعين",fr:"Rédiger le discours de remerciements bénévoles",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:19,ar:"تصميم كلمة لشكر الشركاء",fr:"Rédiger le discours de remerciements partenaires",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:20,ar:"تصميم كلمة عن انجازات النادي وأهداف العام الجديد",fr:"Préparer le bilan annuel et objectifs 2026",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:21,ar:"تصميم رسائل التواصل مع كل الفنانين والشركاء",fr:"Rédiger les messages pour tous les partenaires/prestataires",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:22,ar:"ارسال رسائل التواصل مع كل الفنانين والشركاء",fr:"Envoyer les messages à tous les partenaires/prestataires",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:23,ar:"اعداد قائمة بكل الجهات المدعوة",fr:"Préparer la liste complète des invités institutionnels",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:24,ar:"تصميم رسالة الدعوة للجهات المدعوة",fr:"Créer le message d'invitation officiel",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:25,ar:"ارسال رسائل الدعوة للجهات المدعوة",fr:"Envoyer les invitations officielles",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:26,ar:"تصميم فكرة فيديو النادي الذي سيعرض في الحفل",fr:"Concevoir le concept de la vidéo du club",dept:"شؤون التواصل الخارجي",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:27,ar:"تنفيذ فيديو النادي الذي سيعرض في الحفل",fr:"Produire et monter la vidéo du club",dept:"شؤون التواصل الخارجي",owner:"Yahya",vols:"Yahya",date:"2026-03-20",status:"غير منجز",notes:""},
    {id:28,ar:"تصميم منصة الحجز",fr:"Créer la plateforme de réservation/paiement en ligne",dept:"شؤون الحجز",owner:"",vols:"",date:"",status:"غير منجز",notes:"Helloasso ou équivalent"},
    {id:29,ar:"جمع عدد الحضور وبياناتهم",fr:"Collecter les données des participants en continu",dept:"شؤون الحجز",owner:"Mohamad tashish",vols:"",date:"",status:"غير منجز",notes:"Jusqu'au jour J"},
    {id:30,ar:"متابعة الية الدفع",fr:"Suivre les paiements et faciliter l'accès",dept:"شؤون الحجز",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:31,ar:"تصميم خطة نشر البوستات والفيديوهات",fr:"Créer le calendrier éditorial réseaux sociaux",dept:"شؤون السوشيال ميديا",owner:"",vols:"",date:"",status:"غير منجز",notes:"Avant, pendant, après l'événement"},
    {id:32,ar:"نشر البوستات والفيديوهات",fr:"Publier les posts et vidéos",dept:"شؤون السوشيال ميديا",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:33,ar:"جمع قائمة بكل أعضاء النادي مع ارقامهم وايميلاتهم",fr:"Compiler la liste des membres (téléphones & emails)",dept:"شؤون الداتا",owner:"Mohamad tashish",vols:"",date:"",status:"غير منجز",notes:""},
    {id:34,ar:"تسليم نتائج استبيان ما بعد الحفل لقسم الفعاليات",fr:"Livrer les résultats du questionnaire post-événement",dept:"شؤون الداتا",owner:"Mohamad tashish",vols:"",date:"2026-04-05",status:"غير منجز",notes:""},
    {id:35,ar:"تصميم رسالة لدعوة المتطوعين",fr:"Rédiger le message de recrutement des bénévoles",dept:"شؤون المتطوعين",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:36,ar:"جمع اسماء المتطوعين وانشاء مجموعة واتس",fr:"Lister les bénévoles et créer le groupe WhatsApp",dept:"شؤون المتطوعين",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:37,ar:"الاجتماع بالمتطوعين للشرح وتسليم المهام",fr:"Réunion d'info et attribution des rôles aux bénévoles",dept:"شؤون المتطوعين",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:38,ar:"تأمين العدد الكافي من المتطوعين",fr:"Recruter suffisamment de bénévoles",dept:"شؤون المتطوعين",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:39,ar:"التنسيق المستمر مع مسؤولين المهام",fr:"Coordination continue avec tous les responsables",dept:"شؤون المتطوعين",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:40,ar:"تصميم خطة لتقدير جهود المتطوعين بعد الحفل",fr:"Concevoir un plan de reconnaissance post-événement",dept:"شؤون المتطوعين",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:41,ar:"التأكد من المتطلبات اللازمة للصالة",fr:"Vérifier les besoins en équipement (tables, chaises, cuisine)",dept:"شؤون تنظيم الصالة والحفل",owner:"Mona",vols:"",date:"",status:"غير منجز",notes:""},
    {id:42,ar:"تنظيم استقبال الحضور",fr:"Organiser l'accueil et l'enregistrement des invités",dept:"شؤون تنظيم الصالة والحفل",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:43,ar:"تصميم الجدول الزمني للحفل",fr:"Créer le planning détaillé de la soirée",dept:"شؤون تنظيم الصالة والحفل",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:44,ar:"التأكد من ان الجدول الزمني يتم بشكل جيد أثناء الحفل",fr:"Assurer le bon déroulement du programme le jour J",dept:"شؤون تنظيم الصالة والحفل",owner:"",vols:"",date:"2026-03-28",status:"غير منجز",notes:"Jour J"},
    {id:45,ar:"اختيار متطوعين للوقوف على الستاند",fr:"Désigner les bénévoles pour tenir le stand",dept:"شؤون تنظيم الصالة والحفل",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:46,ar:"التنسيق مع الفنانين بخصوص المتطلبات اللوجستية",fr:"Coordination logistique avec les artistes",dept:"الشؤون الفنية والترفيهية",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:47,ar:"ترتيب الفقرات الفنية حسب جدول زمني خاص",fr:"Planifier le timing des séquences artistiques",dept:"الشؤون الفنية والترفيهية",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:48,ar:"تنسيق شكل المسرح",fr:"Organiser la scène et la décoration",dept:"الشؤون الفنية والترفيهية",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:49,ar:"تصميم وتنفيذ أي فقرات فنية أخرى",fr:"Créer des séquences artistiques supplémentaires",dept:"الشؤون الفنية والترفيهية",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:50,ar:"تصميم اسئلة المسابقات",fr:"Préparer les questions du quiz (Arabe & Français) sur Typeform",dept:"الشؤون الفنية والترفيهية",owner:"Mohamed",vols:"",date:"",status:"غير منجز",notes:"Avec lots"},
    {id:51,ar:"التواصل مع موزعين طعام والاتفاق معهم",fr:"Contacter les traiteurs (type, quantités, prix, livraison)",dept:"شؤون الطعام",owner:"Nour",vols:"",date:"2026-03-01",status:"قيد الانجاز",notes:"Buffet inclus dans ticket 25€"},
    {id:52,ar:"تصميم طريقة التقديم",fr:"Concevoir la présentation visuelle du buffet",dept:"شؤون الطعام",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:53,ar:"تنفيذ طريقة التقديم",fr:"Mettre en place le buffet (jour J)",dept:"شؤون الطعام",owner:"",vols:"",date:"2026-03-28",status:"غير منجز",notes:"Jour J"},
    {id:54,ar:"وضع خطة لتنظيف المكان بعد تقديم الطعام",fr:"Planifier le nettoyage post-buffet",dept:"شؤون الطعام",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:55,ar:"استلام الطعام عند الوصول وعرضه",fr:"Réceptionner et dresser le buffet à l'arrivée",dept:"شؤون الطعام",owner:"",vols:"",date:"2026-03-28",status:"غير منجز",notes:"Jour J"},
    {id:56,ar:"تأمين المشاريب",fr:"Assurer les boissons (cola 3€, café 2€...)",dept:"شؤون الطعام",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
    {id:57,ar:"تأمين الادوات اللازمة من صحون وكاسات ومحارم",fr:"Fournir assiettes, verres et serviettes",dept:"شؤون الطعام",owner:"",vols:"",date:"",status:"غير منجز",notes:""},
  ];

  window.S.budget = [
    {id:1,desc:"Subvention association partenaire",cat:"Subventions",type:"Revenu",amount:1400,status:"Confirmé"},
    {id:2,desc:"Vente tickets (200 × 25€)",cat:"Tickets",type:"Revenu",amount:5000,status:"Estimé"},
    {id:3,desc:"Bar (cola & café pendant l'événement)",cat:"Divers",type:"Revenu",amount:300,status:"Estimé"},
    {id:4,desc:"Location salle (prise en charge par Mona)",cat:"Salle",type:"Dépense",amount:0,status:"Confirmé"},
    {id:5,desc:"Cachet artiste musical syrien",cat:"Artistes",type:"Dépense",amount:150,status:"Estimé"},
    {id:6,desc:"Cachet stand-up comique",cat:"Artistes",type:"Dépense",amount:200,status:"Estimé"},
    {id:7,desc:"Buffet / traiteur syrien",cat:"Nourriture",type:"Dépense",amount:2500,status:"Estimé"},
    {id:8,desc:"Impression flyers & posters",cat:"Communication",type:"Dépense",amount:200,status:"Estimé"},
    {id:9,desc:"Décoration & Photo Booth",cat:"Logistique",type:"Dépense",amount:300,status:"Estimé"},
    {id:10,desc:"Matériel quiz & lots",cat:"Divers",type:"Dépense",amount:150,status:"Estimé"},
    {id:11,desc:"Vaisselle jetable (assiettes, verres, serviettes)",cat:"Logistique",type:"Dépense",amount:100,status:"Estimé"},
  ];

  window.S.venues = [
    {id:1,name:"Salle confirmée (partenaire Mona)",addr:"Paris, France",cap:200,price:0,status:"Confirmé",notes:"Prise en charge par l'entreprise de Mona. Flexible pour toutes les activités. Contact via Gufran."},
    {id:2,name:"Salle alternative (backup)",addr:"Paris",cap:150,price:800,status:"À visiter",notes:"À évaluer en cas de besoin"},
  ];

  window.S.volunteers = [
    {id:1,name:"Mohamed",role:"Coordination générale, Data, Quiz, Excel",email:"",phone:"",avail:"Disponible"},
    {id:2,name:"Nour Lazkani",role:"Communication interne, Restauration, Présentation",email:"nourallazkani@gmail.com",phone:"",avail:"Disponible"},
    {id:3,name:"Yahya",role:"Vidéo & Production",email:"",phone:"",avail:"Disponible"},
    {id:4,name:"Iman",role:"Montage vidéo",email:"",phone:"",avail:"Disponible"},
    {id:5,name:"Mona",role:"Coordination Pitch Session, Salle",email:"",phone:"",avail:"Disponible"},
    {id:6,name:"Jane",role:"Présentation du club",email:"",phone:"",avail:"Disponible"},
    {id:7,name:"Rnaim",role:"Pitch Session, Présentation",email:"",phone:"",avail:"Disponible"},
    {id:8,name:"Yassr",role:"Comptabilité & Budget",email:"",phone:"",avail:"Disponible"},
    {id:9,name:"Mohamad Tashish",role:"Data, Réservations, Membres",email:"",phone:"",avail:"Disponible"},
    {id:10,name:"Gufran",role:"Relations extérieures, Salles",email:"",phone:"",avail:"Disponible"},
  ];

  window.S.providers = [
    {id:1,name:"Artiste musical syrien (À confirmer)",cat:"Artiste musical",contact:"",price:150,status:"À contacter",notes:"Cachet symbolique 100-200€. Répertoire patrimoine syrien modernisé."},
    {id:2,name:"Stand-up comique (À confirmer)",cat:"Stand-up",contact:"",price:200,status:"À contacter",notes:"~20 min. Thème: intégration des Syriens en France."},
    {id:3,name:"Photo Booth (À confirmer)",cat:"Photo Booth",contact:"",price:0,status:"À contacter",notes:"Décor drapeau syrien et couleurs du club."},
    {id:4,name:"Traiteur buffet syrien",cat:"Traiteur",contact:"",price:2500,status:"En négociation",notes:"Buffet inclus dans ticket 25€. Contacter plusieurs restaurants syriens. Nour en charge."},
  ];

  window.S.guests = [];
}
