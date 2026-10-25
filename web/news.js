// Office news shown in the "ข่าวสาร" section: where we went, what cases we handled.
// Same format as articles.js, plus place = where it happened.
// sort: 'YYYY-MM-DD' (Christian year) — the page lists news newest first by this, so order here doesn't matter.
// coverFill: true = the cover is a photo, fill the whole band instead of fitting it with a margin.
window.NEWS = [
  {
    id: 'adultery-cjfc-2569-10-09',
    sort: '2026-10-09',
    date: { th: '9 ตุลาคม 2569', en: '9 October 2026' },
    place: { th: 'ศาลเยาวชนและครอบครัวกลาง', en: 'Central Juvenile and Family Court' },
    cover: 'news-2-cover.jpg',
    coverFill: true,
    title: {
      th: 'ดำเนินการฟ้องชู้ เรียกค่าทดแทน',
      en: 'Filing a compensation claim against a third party (adultery)'
    },
    body: {
      th: [
        'วันที่ 9 ตุลาคม 2569 ดำเนินการ ฟ้องชู้ เรียกค่าทดแทน ณ ศาลเยาวชนและครอบครัวกลาง',
        { img: 'news-2.jpg', caption: 'ศาลเยาวชนและครอบครัวกลาง' }
      ],
      en: [
        '9 October 2026: filed a claim for compensation against a third party in an adultery case at the Central Juvenile and Family Court.',
        { img: 'news-2.jpg', caption: 'Central Juvenile and Family Court' }
      ]
    }
  },
  {
    id: 'cheque-roiet-2569-09-21',
    sort: '2026-09-21',
    date: { th: '21 กันยายน 2569', en: '21 September 2026' },
    place: { th: 'ศาลจังหวัดร้อยเอ็ด', en: 'Roi Et Provincial Court' },
    cover: 'news-1-cover.jpg',
    coverFill: true,
    title: {
      th: 'สืบพยานคดี พ.ร.บ.ว่าด้วยความผิดอันเกิดจากการใช้เช็ค',
      en: 'Witness hearing in a cheque offence case'
    },
    body: {
      th: [
        'วันที่ 21 กันยายน 2569 สืบพยานคดี พระราชบัญญัติว่าด้วยความผิดอันเกิดจากการใช้เช็ค ณ ศาลจังหวัดร้อยเอ็ด',
        { img: 'news-1.jpg', caption: 'ศาลจังหวัดร้อยเอ็ด' }
      ],
      en: [
        '21 September 2026: witness hearing in a case under the Cheque Offences Act at Roi Et Provincial Court.',
        { img: 'news-1.jpg', caption: 'Roi Et Provincial Court' }
      ]
    }
  },
  {
    id: 'hire-purchase-nsw-2569-10-05',
    sort: '2026-10-05',
    date: { th: '5 ตุลาคม 2569', en: '5 October 2026' },
    place: { th: 'ศาลจังหวัดนครสวรรค์', en: 'Nakhon Sawan Provincial Court' },
    cover: 'news-3-cover.jpg',
    coverFill: true,
    title: {
      th: 'ไกล่เกลี่ยและสืบพยาน คดีเช่าซื้อ',
      en: 'Mediation and witness hearing in a hire-purchase case'
    },
    body: {
      th: [
        'วันที่ 5 ตุลาคม 2569 ไกล่เกลี่ยและสืบพยาน คดีเช่าซื้อ ห้องพิจารณาคดีที่ 9 ศาลจังหวัดนครสวรรค์',
        { img: 'news-3.jpg', caption: 'ห้องพิจารณาคดีที่ 9 ศาลจังหวัดนครสวรรค์' }
      ],
      en: [
        '5 October 2026: mediation and witness hearing in a hire-purchase case, Courtroom 9, Nakhon Sawan Provincial Court.',
        { img: 'news-3.jpg', caption: 'Courtroom 9, Nakhon Sawan Provincial Court' }
      ]
    }
  },
  {
    id: 'appeal-chainat-2569-06-17',
    sort: '2026-06-17',
    date: { th: '17 มิถุนายน 2569', en: '17 June 2026' },
    place: { th: 'ศาลจังหวัดชัยนาท', en: 'Chai Nat Provincial Court' },
    cover: 'news-4-cover.jpg',
    coverFill: true,
    title: {
      th: 'ยื่นอุทธรณ์คดีเช่าซื้อ',
      en: 'Filing an appeal in a hire-purchase case'
    },
    body: {
      th: [
        'วันที่ 17 มิถุนายน 2569 ยื่นอุทธรณ์คดีเช่าซื้อ ณ ศาลจังหวัดชัยนาท',
        { img: 'news-4.jpg', caption: 'ศาลจังหวัดชัยนาท' }
      ],
      en: [
        '17 June 2026: filed an appeal in a hire-purchase case at Chai Nat Provincial Court.',
        { img: 'news-4.jpg', caption: 'Chai Nat Provincial Court' }
      ]
    }
  }
];
