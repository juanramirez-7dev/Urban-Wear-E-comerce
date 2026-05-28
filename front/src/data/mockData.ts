const detailThumbnailImages = [
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzSpMstnmC3Li7DAmyQc6bBM1Bo_scexM1muCUAemrVu2ZYJSTUZk7PvVkC5SaCx3aVb0jk276FOF9g3voefqHvKjIfGcpOBwQ3nT4Pcqa5M8IPpCIYP2NJ_l-vCUXvUT9d8UX79850Z1r3Ej8gnvH7kBRED5GuRsbTmDGObcuMu6w9lA2WGZ5MYXgQNzd1O08ApL_9DP7bENXtIYoiLIQtje1W0U3eONyRNpUsrxWA99gOuXpEVKi61NmCSjhtdbe30bZRIUQ-CM7",
    alt: "Fabric detail close-up"
  },
  {
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjSkSmUVHG1tNayDmd6ESOTDg-x2mRENJfYuk-oOc7GdrDmJKoBZzITVLDAx-zPDi8HHcyndhAQgu6WHDqmrS17k9VDfNuQ7yWi-NEDw3EO0LEi43jbE6KuFJqQG18uW7oLbF8-QVJA2_Q7uk6E_ATIZujlgYVaOH-7ek_jeYL2UdwWkVi14NyaPrxSECyMYb7O0-iVReEZNZtWiE7CFuWiXROjivTdkO0asGscd1iTkhX3sbmz8EFOcPl77ZFi8_1Lpn65qYUeygA",
    alt: "Side profile detail"
  }
] as const;

export const productCatalog = [
  {
    id: "minimalist-trench",
    badge: "New Season",
    title: "Minimalist Trench",
    price: "$450.00",
    description:
      "A refined trench coat cut from a matte technical fabric. Designed with sharp lapels and a structured silhouette for a modern urban profile.",
    sizes: ["S", "M", "L", "XL"],
    selectedSize: "M",
    sizeGuideLabel: "Size Guide",
    ctaLabel: "Add To Cart",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBXWVeefi453Q_M_Wqd3409Eu7sFUM3OxJHZQS-dvMSn-3dyYvsc6K0-XuWov3D4pxYbTu9XH1U_wTLLkYHNjRuyjugPEt1wr1qXcwCgenbeUakzHKJCEBQQ5NPqmJd-QVG0XcioH0t03Awjog60N7Pl8jzPAtd6OVQnSrzLyf3rS1wHH4LSxru314dWYjlPKhOtHiRYsYoQRyCml8cm3CNoZJGYvldmFvJoeqGUa7J7l4XcRcTEP0pFZLo0Ir1U0_SDbmhUoypw2W6",
    imageAlt:
      "Full body shot of a minimalist black trench coat on a white background.",
    gallery: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXWVeefi453Q_M_Wqd3409Eu7sFUM3OxJHZQS-dvMSn-3dyYvsc6K0-XuWov3D4pxYbTu9XH1U_wTLLkYHNjRuyjugPEt1wr1qXcwCgenbeUakzHKJCEBQQ5NPqmJd-QVG0XcioH0t03Awjog60N7Pl8jzPAtd6OVQnSrzLyf3rS1wHH4LSxru314dWYjlPKhOtHiRYsYoQRyCml8cm3CNoZJGYvldmFvJoeqGUa7J7l4XcRcTEP0pFZLo0Ir1U0_SDbmhUoypw2W6",
        alt: "Minimalist Trench"
      },
      ...detailThumbnailImages
    ]
  },
  {
    id: "merino-wool-knit",
    badge: "New Season",
    title: "Merino Wool Knit",
    price: "$280.00",
    description:
      "A soft merino knit with a relaxed tailored fit. Lightweight warmth for layered city looks and clean, minimalist styling.",
    sizes: ["S", "M", "L", "XL"],
    selectedSize: "M",
    sizeGuideLabel: "Size Guide",
    ctaLabel: "Add To Cart",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0VaUED8XmY0yZoz3AFK1m5bB7y52CWArfNcc7sr_QfVcZQaRfj74s7jwxwGULXYWsZEyvGeqlkJeNHX7LZcrRlxwCtXbOx9FAX4RF8NIrlycO4Wsr4p5Dto-bZ-P0hpcr-Y7zaETJLeTitLiXU5fF5mPUlslPziPGiF_DR2sYxg1KQIx0I96y1viwQYZhqhlvAAMJMO4xSFUgm-wXKaruWVC5qL9LYwpW8DdJDXY0L_nBLsqT1L1oAbkZribU8nIwrpjCYT29zjp2",
    imageAlt:
      "A portrait-oriented product shot of a grey textured merino wool sweater.",
    gallery: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0VaUED8XmY0yZoz3AFK1m5bB7y52CWArfNcc7sr_QfVcZQaRfj74s7jwxwGULXYWsZEyvGeqlkJeNHX7LZcrRlxwCtXbOx9FAX4RF8NIrlycO4Wsr4p5Dto-bZ-P0hpcr-Y7zaETJLeTitLiXU5fF5mPUlslPziPGiF_DR2sYxg1KQIx0I96y1viwQYZhqhlvAAMJMO4xSFUgm-wXKaruWVC5qL9LYwpW8DdJDXY0L_nBLsqT1L1oAbkZribU8nIwrpjCYT29zjp2",
        alt: "Merino Wool Knit"
      },
      ...detailThumbnailImages
    ]
  },
  {
    id: "architectural-trouser",
    badge: "New Season",
    title: "Architectural Trouser",
    price: "$320.00",
    description:
      "Clean pleats and technical drape create a precise shape. Built for day-to-night styling with a refined urban silhouette.",
    sizes: ["S", "M", "L", "XL"],
    selectedSize: "M",
    sizeGuideLabel: "Size Guide",
    ctaLabel: "Add To Cart",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWUmTG4rtQ9J9snWfhjAgJwNlnKZru_o7wC7DM1i-RtintROrbIqdsHROLYV384NnmY4q4LLz3rge2jU-xq-42ZSF0nm5Jbo8Y7VOojwcLTkXWtr5inohOXBzGe70qTz7S43JHWCzlXpz1ZUPtVt-jboH8OHh1wP9-eDQ0VIRtEnmImMFORqM3f2589D9fxUEdvsTCmBgBNeIYmszbAiW-7U16nMVEIAhAbIq6iEhyZ0BeQQ-munoDM19mSXV05DSzxtlhJcpYiZMF",
    imageAlt:
      "An editorial shot of structured black trousers made from high-grade technical fabric.",
    gallery: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWUmTG4rtQ9J9snWfhjAgJwNlnKZru_o7wC7DM1i-RtintROrbIqdsHROLYV384NnmY4q4LLz3rge2jU-xq-42ZSF0nm5Jbo8Y7VOojwcLTkXWtr5inohOXBzGe70qTz7S43JHWCzlXpz1ZUPtVt-jboH8OHh1wP9-eDQ0VIRtEnmImMFORqM3f2589D9fxUEdvsTCmBgBNeIYmszbAiW-7U16nMVEIAhAbIq6iEhyZ0BeQQ-munoDM19mSXV05DSzxtlhJcpYiZMF",
        alt: "Architectural Trouser"
      },
      ...detailThumbnailImages
    ]
  },
  {
    id: "urban-leather-boot",
    badge: "New Season",
    title: "Urban Leather Boot",
    price: "$580.00",
    description:
      "Polished leather with a chunky sole for a bold stance. Finished with minimal stitching and a sleek profile.",
    sizes: ["S", "M", "L", "XL"],
    selectedSize: "M",
    sizeGuideLabel: "Size Guide",
    ctaLabel: "Add To Cart",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhBNrKSe-fmbyjSONqOlPOW5IeweXcXbSYG3_S-iHMAVbe7_WzB3qEnaqBwlDIkC1zrwZMZetwDf_IzLeKansk5jKeIfB06fpNnvigHW7hEZ4VFbW4MKtHp6JBFbK4zrN4vghRdwuTyjvMmJTMEHYR1N-hrZxfxx-Q8rxsHDO5LgwTs7_yqiBa8FbJftnvgnI2kygtJXLEIbPrLWXdAzoR_7ddi2HYbWWwoP0wb5DnNUakys9Xn_8svu6LRHz9eoVAreg8biT__7v9",
    imageAlt:
      "Studio photography of minimalist black leather boots with a chunky sole and clean stitching.",
    gallery: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhBNrKSe-fmbyjSONqOlPOW5IeweXcXbSYG3_S-iHMAVbe7_WzB3qEnaqBwlDIkC1zrwZMZetwDf_IzLeKansk5jKeIfB06fpNnvigHW7hEZ4VFbW4MKtHp6JBFbK4zrN4vghRdwuTyjvMmJTMEHYR1N-hrZxfxx-Q8rxsHDO5LgwTs7_yqiBa8FbJftnvgnI2kygtJXLEIbPrLWXdAzoR_7ddi2HYbWWwoP0wb5DnNUakys9Xn_8svu6LRHz9eoVAreg8biT__7v9",
        alt: "Urban Leather Boot"
      },
      ...detailThumbnailImages
    ]
  }
] as const;

export const landingPageContent = {
  nav: {
    brand: "URBAN",
    links: [
      { label: "Shop", href: "#", isActive: true },
      { label: "Collections", href: "#" },
      { label: "New Arrivals", href: "#" },
      { label: "Archive", href: "#" }
    ],
    searchPlaceholder: "SEARCH"
  },
  hero: {
    titleLines: ["ESSENTIALS", "COLLECTION"],
    subtitle:
      "A curated selection of timeless silhouettes designed for the modern urban landscape. Quality materials meet meticulous craftsmanship.",
    ctaLabel: "SHOP NOW",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjXsCuOsaE9vPFZU2_c8_5VttRW9CYaxiM3-hy0JqCpx4g3aq8Ik8Bf8PSpWYdn_s5VzuwAoxfqLG96OCkDsxd6WDABloYFK_gpXa8gRt0l2dIgt81WpYiHO1ukbPrJMnCyNQvOFE84aWWOWKqlz1D4SKPLtTiSAsoS_Eoodv66hgh19ihpom1gweIMYcBY0C2qBv9CDLhs7nyWM_LSptfHD7s7RHUJSpqcRyvHYAIOGA2pP7Pr_MtCRijJgDS2eGmk9h5RbgOFfJ1",
    imageAlt: "Urban Fashion Essentials Collection"
  },
  categories: {
    primary: {
      title: "Outerwear",
      ctaLabel: "Discover more",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDG3BCsOn5vk5VCkBxkII_RSLDEAoS0Zj-si-lovI2xaaFqQdT802f6m03Sk9IdxhXv13CmqNhpjS2eNH7QELY5TBw83C6vaMqNC5GcKh5jAIlKNJjD_BTB4CTS8QY-1bWbkidAYTUHAETvEzjyS0Zx1wr5oBl_MDnvSeSxb37OQcQfR1g6716T2sgISEuSAQaaIXIpnP7bh2WGmASBP6iyT0tFsBqCAmdRZ8uE0qHNc3YG2qp9zm50O3zhGFhxqm4JJIFYD55LZFCZ",
      imageAlt:
        "A sophisticated medium shot of a man wearing a high-end tailored wool overcoat in a soft charcoal grey."
    },
    secondary: [
      {
        title: "Knitwear",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuANIVI1quRKbD4kQEOCPRmNPlgWZawDvSRBC1ixPAC3i5tCk_S2D7tmOwb8Fgda9I_uRR_BTHwnbJaAGDYOmUMTaddgWjmnbBjmJ9DcF4CkMddhwy82xSZw5nb_RcrMzdbmkeYofNp4h2-3rqJwn90G-YSBEqdyCGyU2E9GFYPiWwKxP12D-rUd50aLWeCsu0Dg_uI0WdnhJbYomtavbKeAVj8kg4i70xOuCn1aLZJwO7MrCAqOwXC-vDD7j3kiFW0vJ3Hv7cNrDsf3",
        imageAlt:
          "A close-up artistic photograph of a folded high-quality cashmere sweater in a neutral cream tone."
      },
      {
        title: "Accessories",
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAD6NXNf1vso-dF5tSaumq3iFz-YcG0QeeLsLN8L_QxZ80R816Mebi9lCctOfq5P2YzWxukvbzfhQSAvJ4rN0L_ruzzprdl0fg9AE3_JYvrGxdGEnCQF1oNUrmb5II4ZgtMS8rg5MFHV6EwQqZK5jdPKGo89u4TniQ_ZjqGyvSFYeuju2J36hNPXx5ug7rKve0Gm2PU-JteIqKpxfFoLqAdRUK3KYffpMyJJd8egyNbWXZXcJtFP9WvwJPtsvZ3dJ-2VdI69N_lYLIh",
        imageAlt:
          "A premium selection of leather goods and fashion accessories arranged on a sleek grey stone surface."
      }
    ]
  },
  featured: {
    label: "Seasonal Highlight",
    title: "FEATURED PIECES",
    viewAllLabel: "View All",
    products: productCatalog
  },
  quote: {
    text:
      "Modernity is not in the ornament, but in the precision of the cut and the purity of the material.",
    label: "Urban Design Philosophy"
  },
  footer: {
    brand: "URBAN",
    copyright: "(c) 2024 URBAN FASHION GROUP",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Contact", href: "#" }
    ]
  }
} as const;

export const premiumLoadingContent = {
  brand: "URBAN",
  label: "Loading Experience",
  estLabel: "Est. 2024",
  progressLabel: "Loading",
  backgroundImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDAxMWXbBMjxy7781lySPfbdTDshX1CeXF1r-IZJCXscNEo7RaJ3RLl5iWbESUNI5cQOkloz8xr8QZNxXNMzyThlBLrri9bdyEajpr3pjkzoRYCoJV_FLbmvFqTxlA3DVjZaXFlMpGoF-pDNbAwH8V2mlfn6Xyvb0wunUgdzoUJCEmRAVDMMo3hT114GkCOfKdYfDAGhY9LZJSOepttsca1rcwnC8AtFbUYYgxTVhibPcCIQfqqoa99IEHOGFVyO9BQGXqEu71TSOWw",
  backgroundImageAlt:
    "A high-end minimalist urban fashion boutique interior with clean architectural lines, polished concrete floors, and stark white walls."
} as const;

export const adminCreateProductContent = {
  eyebrow: "Inventory Management",
  title: "Create New Product",
  cancelLabel: "CANCEL",
  publishLabel: "Publish Product",
  productNameLabel: "Product Name",
  productNamePlaceholder: "e.g. Oversized Cotton Trench Coat",
  descriptionLabel: "Description",
  descriptionPlaceholder:
    "Tell a story about the craftsmanship, fabric, and fit...",
  priceLabel: "Base Price (USD)",
  pricePlaceholder: "0.00",
  imageLabel: "Primary Image",
  imagePlaceholderTitle: "Drag & Drop Product Image",
  imagePlaceholderHint: "Minimum 2000x3000px JPG/PNG",
  primaryImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCuTp8Pwz-T5Fo68E8xktyMxPlajck8ulDiAToixB5VxHlAbzJP7inqQqi6gSNP-zJgV2WUkuItbq9IAwHCvwfWf_8tvivifgGP25EK9-Q_0GSRqIsa8uLWu0vnWEYz5DGpsRdaioklXlcdUX16LAnrZgN9ln2ZZ9w9P0GXF4VhEiYCXyy6i9Vb8pLORubAbOF4bv9v-4s-NGqR3lwnEkIb-JqSfM6Hvb_f_rnz6QC6FMULOOjNktNocmfGzw_VRk_uevrpRNhbpyT3",
  primaryImageAlt:
    "A high-fashion editorial product shot of a minimalist beige trench coat displayed on a featureless, soft grey background.",
  galleryLabel: "Gallery",
  galleryImages: [
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuClYs-KRIpxZq7zTpWSCFSjxvzXjHV-WskhlZD2UZAMRSqaZ7qywbIeGEHFj-KkukScyJvVcIsiH4d7NvLTDw7oIbBK0UxlrDZW5DQFjWgXdt3mpXVFWoB0i_QWFsbIn0wwm68rbGzILHRNHYkId_dz1_AyOKa3oQSH14vT5I5wx5MBXiSGfazC6gMPEwWZEOJ5_oQxZ3h_KVEjOIFyAkPtggCIcYBzbKFkH1qtKt81oAEkQaoIbhDR2PAafT7MfS7L8VpDTiLVVa54",
      alt: "Fabric detail close-up"
    },
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAi2zqhOhIWHKBmXeccdwrzTsSYMWOOrlBQNNd3MhIF5Spohg53K54zgspWx0QeGgRIWkDJ34lFYBQRye2H_Ho0OKGs12oVfH6IPqsgDCzVt7P8aiXJCCM1nWOSyzNk0EgtN6ApFrV5KTIJCyhyeCq8UypuN9CZrAN0asFrQw3lQw3UZXyc-RddeHiOQ5pKZ0A61zXqJoKMHW6WYzZKRpREkCDKIfjLl5z6dAxZcZgBrGMlx6TcF3fXeYgPswpKf0Mg5_8VwqZT6IFx",
      alt: "Accessory detail shot"
    }
  ] as const,
  categoryLabel: "Category",
  categories: ["Buzos", "Pantalones", "Bsicas", "Grficas"] as const,
  selectedCategory: "Pantalones",
  variantsLabel: "Inventory & Variants",
  sizeLabel: "Size",
  stockLabel: "Stock Quantity",
  variantSizes: ["S", "M", "L", "XL"] as const,
  initialVariants: [
    { id: "variant-l", size: "L", stock: 12 },
    { id: "variant-m", size: "M", stock: 8 }
  ] as const,
  footer: {
    copyright: "© 2024 URBAN FASHION GROUP",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Documentation", href: "#" }
    ] as const
  }
} as const;
