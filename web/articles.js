// Legal articles shown in the "บทความกฎหมาย" section.
// To add an article: copy one { ... } block, give it a new id, and put its pictures in this folder.
// body = list of blocks: a plain string is a paragraph, { img: 'file.jpg', caption: '...' } is a picture.
// en is optional; if missing, the Thai text is shown on the EN page too.
// sort: 'YYYY-MM-DD' (Christian year) — the page lists articles newest first by this.
window.ARTICLES = [
  {
    id: 'mule-account',
    sort: '2026-09-13',
    date: { th: '13 ก.ย. 2569 · คำพิพากษาศาลฎีกาที่ 4920/2567', en: '13 Sep 2026 · Supreme Court Judgment 4920/2567' },
    cover: 'mule-account-cover.jpg',
    title: { th: 'รับจ้างเปิดบัญชีม้า อย่าหาทำ!!', en: 'Renting out your bank account ("mule account"): don\'t do it!' },
    body: {
      th: [
        { img: 'mule-account.jpg', caption: 'คำพิพากษาศาลฎีกาที่ 4920/2567' },
        'การรับจ้างเปิดบัญชีแล้ว “มอบบัญชีเงินฝาก” ให้บุคคลอื่นไปใช้เป็นเรื่องผิดปกติวิสัย ย่อมแสดงให้เห็นเจตนาร้ายของเจ้าของบัญชี คนร้ายอาจนำสมุดบัญชีเงินฝากของจำเลยไปใช้ในการกระทำความผิดกฎหมาย หรือแสวงหาประโยชน์ที่มิควรได้โดยชอบ'
      ]
    }
  },
  {
    id: 'debtor-post',
    sort: '2026-08-07',
    date: { th: '7 ส.ค. 2569 · คำพิพากษาศาลฎีกาที่ 7256/2567', en: '7 Aug 2026 · Supreme Court Judgment 7256/2567' },
    cover: 'debtor-post-cover.jpg',
    title: { th: 'เจ้าหนี้ระวัง!!! โพสต์ประจานลูกหนี้บน Facebook', en: 'Creditors beware: shaming a debtor on Facebook' },
    body: {
      th: [
        { img: 'debtor-post.jpg', caption: 'คำพิพากษาศาลฎีกาที่ 7256/2567' },
        'โพสต์ประจานลูกหนี้บน Facebook ตั้งค่าเป็นสาธารณะ = หมิ่นประมาทด้วยการโฆษณา',
        'เจ้าหนี้โพสต์ข้อความและภาพถ่ายเพื่อประจานลูกหนี้ว่าเป็นคน “โกง” เป็นหนี้แล้วไม่ยอมใช้ โดยตั้งค่าเป็นสาธารณะ เจ้าหนี้ควรต้องใช้สิทธิดำเนินคดีแก่ลูกหนี้เพื่อขอให้บังคับลูกหนี้ชำระหนี้แก่เจ้าหนี้ด้วยวิธีการที่ถูกต้อง การโพสต์ประจานให้คนทั่วไปเห็นจึงไม่เข้าข้อยกเว้นตาม ป.อ. มาตรา 329'
      ]
    }
  },
  {
    id: 'love-definition',
    sort: '2026-08-18',
    date: { th: '18 ส.ค. 2569 · คำพิพากษาศาลฎีกาที่ 6083/2546', en: '18 Aug 2026 · Supreme Court Judgment 6083/2546' },
    cover: 'love-definition-cover.jpg',
    title: { th: 'คดีแรกที่ศาลให้นิยาม “ความรัก”', en: 'The first case where the court defined "love"' },
    body: {
      th: [
        { img: 'love-definition.jpg', caption: 'คำพิพากษาศาลฎีกาที่ 6083/2546' },
        '“ความรัก” เป็นสิ่งที่เกิดขึ้นจากใจ ไม่อาจบังคับกันได้ ความรักที่แท้จริง คือ ความปรารถนาดีต่อคนที่ตนรัก ความยินดีที่คนที่ตนรักมีความสุข การให้อภัยเมื่อคนที่ตนรักทำผิด การเสียสละความสุขของตนเพื่อความสุขของคนที่ตนรัก'
      ]
    }
  },
  {
    id: 'adultery-suit',
    sort: '2026-08-11',
    date: { th: '11 ส.ค. 2569 · คำพิพากษาศาลฎีกาที่ 2590/2561', en: '11 Aug 2026 · Supreme Court Judgment 2590/2561' },
    cover: 'adultery-suit-cover.jpg',
    title: { th: 'ฟ้องชู้หลังจดทะเบียนหย่า “สามารถทำได้”', en: 'Suing the third party after divorce: "it can be done"' },
    body: {
      th: [
        { img: 'adultery-suit.jpg', caption: 'คำพิพากษาศาลฎีกาที่ 2590/2561' },
        'หากหย่าขาดกันแล้วเพราะอีกฝ่ายมีชู้ แม้หย่าแล้วไม่เกิน 1 ปี “ฟ้องได้” แม้ภายหลังมีการจดทะเบียนหย่ากันแล้ว สิทธิในการฟ้องก็หาได้หมดสภาพหรือถูกลบล้างตามไปด้วยไม่ ตามประมวลกฎหมายแพ่งและพาณิชย์ มาตรา 1523'
      ]
    }
  }
];
