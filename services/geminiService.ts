

import { GoogleGenAI } from "@google/genai";
import { ActiveAlertData, KeyIndicatorData, RegionalForecastData, DomainFilter, RegionDetailData, ResourceData, ScenarioParams, ChildProfile, GrowthRecord } from "../types";

// This is a mock implementation. In a real application, you would use:
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getExecutiveBriefing = async (
    domain: DomainFilter,
    indicators: KeyIndicatorData[],
    alerts: ActiveAlertData[]
): Promise<string> => {
    const criticalAlerts = alerts.filter(a => a.level === 'CRITICAL');
    const highAlerts = alerts.filter(a => a.level === 'HIGH');

    const prompt = `
      You are a senior policy advisor at Kemenko PMK, responsible for monitoring the national PAUD-HI program.
      Your task is to provide a concise, insightful executive briefing based on the latest dashboard data.

      **Current Context:**
      - **Focus Domain:** ${domain}
      - **Key Indicators:**
        ${indicators.map(i => `- ${i.label}: ${i.value} (Trend: ${i.change > 0 ? '+' : ''}${i.change}%)`).join('\n        ')}
      - **Active Alerts Summary:**
        - Total Alerts: ${alerts.length}
        - Critical Alerts: ${criticalAlerts.length} (${criticalAlerts.map(a => `${a.title} in ${a.region}`).join(', ') || 'None'})
        - High Alerts: ${highAlerts.length}

      **Instructions:**
      1.  Start with a headline summarizing the overall situation for the selected domain.
      2.  In one paragraph, analyze the situation. Connect the key indicators with the active alerts. Are the trends in the indicators reflected in the alerts?
      3.  Identify the #1 most pressing issue right now. This should be the most critical alert or a worrying trend.
      4.  Conclude with a single, high-priority strategic recommendation or question to guide the discussion.
      5.  The entire response must be in Bahasa Indonesia. Format as simple markdown.
    `;

    console.log("--- MOCK GEMINI PROMPT (EXECUTIVE BRIEFING) ---");
    console.log(prompt);
    console.log("----------------------------------------------");

    // Mocking the API call and response
    return new Promise((resolve) => {
        setTimeout(() => {
            let briefing = `### Ringkasan Eksekutif: Fokus pada ${domain}\n\n`;
            if (criticalAlerts.length > 0) {
                const topAlert = criticalAlerts[0];
                briefing += `**Situasi saat ini menunjukkan tantangan serius di bidang ${domain}, terutama terkait ${topAlert.title.toLowerCase()} di ${topAlert.region}.** Meskipun beberapa indikator makro seperti ${indicators[0].label} menunjukkan ${indicators[0].change > 0 ? 'perbaikan' : 'penurunan'}, munculnya ${criticalAlerts.length} alert level KRITIS menandakan adanya masalah akut di tingkat regional yang membutuhkan perhatian segera. Isu di ${topAlert.region} berisiko memburuk jika tidak ditangani cepat.\n\n`;
                briefing += `**Isu Paling Mendesak:**\n**${topAlert.title} di ${topAlert.region} (Skor Risiko: ${topAlert.riskScore})**. Ini adalah prioritas utama kita.\n\n`;
                briefing += `**Rekomendasi Strategis:**\nSegera bentuk tim respons cepat untuk memvalidasi data dan merumuskan rencana intervensi awal untuk ${topAlert.region} dalam 48 jam ke depan.`;

            } else {
                briefing += `**Situasi bidang ${domain} secara umum terkendali, namun beberapa wilayah dengan risiko TINGGI perlu diwaspadai.** Indikator kunci seperti ${indicators[0].label} bergerak ke arah yang positif, yang mencerminkan keberhasilan program skala luas. Namun, adanya ${highAlerts.length} alert level TINGGI menunjukkan bahwa keberhasilan ini belum merata dan masih ada kantong-kantong masalah.\n\n`;
                briefing += `**Isu Paling Mendesak:**\nMencegah eskalasi risiko di wilayah dengan status 'Tinggi', khususnya di ${highAlerts.map(a => a.region).join(', ')}.\n\n`;
                briefing += `**Rekomendasi Strategis:**\nBagaimana kita bisa mereplikasi praktik baik dari wilayah yang stabil ke wilayah-wilayah yang masih menunjukkan risiko tinggi?`;
            }
            resolve(briefing);
        }, 1200);
    });
};


// We simulate the API response for demonstration purposes.
export const getSmartRecommendations = async (alert: ActiveAlertData): Promise<string> => {
  console.log("Generating smart recommendations for:", alert);

  // This is the prompt that would be sent to the Gemini API
  const prompt = `
    You are an expert in public health policy for early childhood development in Indonesia.
    Based on the following health alert, provide three specific, actionable, and efficient intervention recommendations.
    Format the response as a well-structured markdown with a title and a numbered list.

    Alert Details:
    - Issue: ${alert.title}
    - Region: ${alert.region}
    - Risk Score: ${alert.riskScore}
    ${alert.target ? `- Target: >${alert.target}%` : ''}
    ${alert.trend ? `- Trend: +${alert.trend}%` : ''}

    Provide recommendations that are contextual to Indonesia and consider resource constraints.
  `;

  console.log("--- MOCK GEMINI PROMPT (SINGLE ALERT) ---");
  console.log(prompt);
  console.log("--------------------------");

  // Mocking the API call and response
  return new Promise((resolve) => {
    setTimeout(() => {
        let recommendations = `### Rekomendasi Intervensi untuk ${alert.title} di ${alert.region}\n\n`;

        if (alert.title.includes('Imunisasi')) {
            recommendations += `
1.  **Program "Kejar Imunisasi" Bergerak**: Luncurkan unit imunisasi mobile yang proaktif mengunjungi desa-desa dengan cakupan terendah. Libatkan kader Posyandu dan PKK untuk melakukan pemetaan dan pendataan anak yang belum diimunisasi lengkap. Berikan insentif kecil bagi kader yang berhasil mengajak 5 keluarga untuk melengkapi imunisasi anaknya.
2.  **Kampanye Edukasi Digital & Tokoh Masyarakat**: Buat konten edukasi singkat (video, infografis) tentang pentingnya imunisasi dan bahaya penyakit yang dapat dicegah (PD3I) dalam bahasa daerah. Sebarkan melalui WhatsApp Group, Facebook, dan gandeng tokoh agama/masyarakat sebagai juru bicara untuk mengatasi misinformasi dan keraguan.
3.  **Penguatan Sistem Rantai Dingin (Cold Chain)**: Lakukan audit dan perbaikan cepat pada fasilitas penyimpanan vaksin di Puskesmas Pembantu (Pustu) dan Poskesdes di wilayah ${alert.region}. Pastikan ketersediaan vaksin dan logistik pendukungnya tidak terhambat.
            `;
        } else if (alert.title.includes('ISPA')) {
            recommendations += `
1.  **Edukasi & Distribusi Masker dan Hand Sanitizer**: Fokuskan penyuluhan pada perilaku hidup bersih dan sehat (PHBS), terutama cara mencuci tangan yang benar dan etika batuk/bersin. Lakukan pembagian masker gratis di Posyandu dan PAUD, khususnya di wilayah ${alert.region} yang mengalami tren peningkatan.
2.  **Gerakan "Rumah Bebas Asap Rokok"**: Inisiasi kampanye tingkat RT/RW untuk mengurangi paparan asap rokok pada anak di dalam rumah, yang merupakan faktor risiko utama ISPA. Berikan penghargaan sederhana bagi RT/RW dengan partisipasi tertinggi.
3.  **Peningkatan Kapasitas Deteksi Dini oleh Kader**: Latih kader Posyandu untuk mengenali tanda-tanda bahaya ISPA pada balita (seperti napas cepat atau sesak napas) menggunakan metode hitung napas sederhana. Bekali mereka dengan alur rujukan yang jelas ke Puskesmas terdekat.
            `;
        } else {
            recommendations += `
1.  **Analisis Faktor Risiko Lokal**: Lakukan investigasi cepat untuk mengidentifikasi penyebab utama masalah di ${alert.region}.
2.  **Mobilisasi Kader Lokal**: Aktifkan kader Posyandu dan PKK untuk melakukan kunjungan dari rumah ke rumah.
3.  **Kolaborasi Lintas Sektor**: Adakan rapat koordinasi dengan dinas terkait (Pendidikan, Sosial) untuk merancang program bersama.
            `;
        }
      resolve(recommendations);
    }, 1500); // Simulate network delay
  });
};

export const getForecastingInsight = async (
    domain: string,
    horizon: string,
    topIncreases: RegionalForecastData[],
    topDecreases: RegionalForecastData[],
    overallTrend: number
): Promise<string> => {
    // This is the prompt that would be sent to the Gemini API
    const prompt = `
      You are a public health data analyst specializing in Indonesian early childhood development.
      Analyze the provided forecasting data for the **${domain}** domain over the next **${horizon}**.

      **Key Data Points:**
      - **Overall Trend:** The average risk score is predicted to change by ${overallTrend.toFixed(1)} points.
      - **Top Escalations:** The regions with the highest predicted risk increase are ${topIncreases.map(r => `${r.region} (+${r.change})`).join(', ')}.
      - **Top Improvements:** The regions with the most significant predicted risk decrease are ${topDecreases.map(r => `${r.region} (${r.change})`).join(', ')}.

      Based on this data, provide a concise analysis in well-structured markdown format. The analysis should:
      1.  Start with a clear, one-sentence summary of the overall outlook.
      2.  Explain potential underlying factors for the general trend (e.g., seasonal patterns, recent programs).
      3.  Hypothesize specific reasons for the escalations in the highlighted regions (e.g., supply chain issues, local health crises).
      4.  Suggest possible drivers for the improvements in the other highlighted regions (e.g., successful local interventions, effective campaigns).
      5.  Conclude with a forward-looking statement or a high-level recommendation.

      Keep the language clear, direct, and suitable for government policymakers.
    `;

    console.log("--- MOCK GEMINI PROMPT (FORECASTING INSIGHT) ---");
    console.log(prompt);
    console.log("----------------------------------------------");

    // Mocking the API call and response
    return new Promise((resolve) => {
        setTimeout(() => {
            let insight = `### Analisis Prediksi Risiko Bidang ${domain}\n\n`;
            insight += `Secara keseluruhan, prediksi **${horizon}** ke depan menunjukkan **${overallTrend > 0 ? 'peningkatan' : 'penurunan'} risiko** di bidang ${domain}. Perlu perhatian khusus pada wilayah dengan eskalasi tinggi, sambil mempelajari keberhasilan dari wilayah yang menunjukkan perbaikan.\n\n`;
            insight += `**Faktor Pendorong Tren:**\n`;
            
            if (domain === 'Kesehatan' && overallTrend > 0) {
                 insight += `- **Potensi Faktor Musiman:** Peningkatan risiko kesehatan sejalan dengan potensi musim pancaroba yang dapat meningkatkan kasus ISPA atau penyakit menular lainnya.\n`;
                 insight += `- **Kewaspadaan Pasca-Liburan:** Mobilitas penduduk yang tinggi pasca periode liburan mungkin berkontribusi pada penyebaran penyakit jika tidak diimbangi dengan surveilans yang ketat.\n\n`;
            } else if (domain === 'Gizi' && overallTrend < 0) {
                 insight += `- **Efek Program Gizi:** Tren penurunan risiko kemungkinan merupakan dampak positif dari program pemberian makanan tambahan (PMT) dan edukasi gizi yang telah berjalan.\n`;
                 insight += `- **Peningkatan Kesadaran:** Kesadaran masyarakat akan pentingnya gizi seimbang bagi balita yang terus meningkat.\n\n`;
            } else {
                 insight += `- **Dinamika Program Lokal:** Implementasi program di tingkat daerah yang bervariasi dapat menjadi pendorong utama tren yang terlihat.\n`;
                 insight += `- **Kondisi Sosio-Ekonomi:** Perubahan kondisi ekonomi lokal dapat mempengaruhi kemampuan keluarga dalam mengakses layanan.\n\n`;
            }

            insight += `**Analisis Wilayah Spesifik:**\n`;
            insight += `- **Eskalasi Tertinggi (${topIncreases.map(r => r.region).join(', ')}):** Kenaikan signifikan di wilayah ini memerlukan investigasi mendalam. Kemungkinan penyebabnya antara lain: kendala distribusi logistik kesehatan, penurunan aktivitas Posyandu, atau adanya kejadian luar biasa (KLB) lokal yang belum teridentifikasi.\n`;
            insight += `- **Perbaikan Terbaik (${topDecreases.map(r => r.region).join(', ')}):** Wilayah ini menunjukkan potensi keberhasilan intervensi. Perlu dipelajari apakah ada inovasi program, penguatan kapasitas kader, atau kampanye lokal yang efektif yang bisa direplikasi di wilayah lain.\n\n`;
            
            insight += `**Rekomendasi Awal:**\nFokuskan alokasi sumber daya pengawasan dan intervensi dini ke wilayah-wilayah yang diprediksi mengalami eskalasi risiko. Lakukan studi kasus cepat di wilayah yang menunjukkan perbaikan untuk mengidentifikasi praktik terbaik.`;

            resolve(insight);
        }, 1500); // Simulate network delay
    });
};

export const getRegionalAnalysisInsight = async (
    regionData: RegionDetailData
): Promise<string> => {
    // This is the prompt that would be sent to the Gemini API
    const prompt = `
      You are a senior data analyst and public policy expert for PAUD HI in Indonesia.
      Analyze the detailed data for the region **${regionData.name}** and provide an analysis of interdependencies between different metrics.

      **Regional Data (${regionData.name}):**
      - **Overall Risk Score:** ${regionData.overallRisk} (National Average: 65)
      - **Domain-specific Risk Scores & Metrics:**
        - **Kesehatan (Risk: ${regionData.domains.Kesehatan.riskScore}):**
          ${regionData.domains.Kesehatan.metrics.map(m => `- ${m.label}: ${m.value}${m.unit} (Nat. Avg: ${m.nationalAverage}${m.unit})`).join('\n          ')}
        - **Gizi (Risk: ${regionData.domains.Gizi.riskScore}):**
          ${regionData.domains.Gizi.metrics.map(m => `- ${m.label}: ${m.value}${m.unit} (Nat. Avg: ${m.nationalAverage}${m.unit})`).join('\n          ')}
        - **Pengasuhan (Risk: ${regionData.domains.Pengasuhan.riskScore}):**
          ${regionData.domains.Pengasuhan.metrics.map(m => `- ${m.label}: ${m.value}${m.unit} (Nat. Avg: ${m.nationalAverage}${m.unit})`).join('\n          ')}
        - **Perlindungan (Risk: ${regionData.domains.Perlindungan.riskScore}):**
          ${regionData.domains.Perlindungan.metrics.map(m => `- ${m.label}: ${m.value}${m.unit} (Nat. Avg: ${m.nationalAverage}${m.unit})`).join('\n          ')}
        - **Kesejahteraan (Risk: ${regionData.domains.Kesejahteraan.riskScore}):**
          ${regionData.domains.Kesejahteraan.metrics.map(m => `- ${m.label}: ${m.value}${m.unit} (Nat. Avg: ${m.nationalAverage}${m.unit})`).join('\n          ')}

      **Instructions:**
      1.  Start with a headline summarizing the main analytical finding for ${regionData.name}.
      2.  In 1-2 paragraphs, identify and explain potential **interdependencies or correlations** between the data points. For example, does poor sanitation correlate with high ISPA prevalence? Does low PAUD access correlate with parenting quality scores?
      3.  Don't just state the numbers; interpret them to tell a story about the challenges in the region.
      4.  Conclude with a key question or a hypothesis that could guide a deeper field investigation.
      5.  The entire response must be in Bahasa Indonesia and formatted as simple markdown.
    `;

    console.log("--- MOCK GEMINI PROMPT (REGIONAL ANALYSIS INSIGHT) ---");
    console.log(prompt);
    console.log("-----------------------------------------------------");

    // Mocking the API call and response
    return new Promise((resolve) => {
        setTimeout(() => {
            let insight = `### Analisis Ketergantungan Data untuk ${regionData.name}\n\n`;
            
            if (regionData.name === 'Papua') {
                insight += `**Korelasi kuat teridentifikasi antara rendahnya akses layanan dasar (Kesejahteraan) dengan tingginya risiko Kesehatan dan Gizi.** Wilayah ${regionData.name} menunjukkan skor risiko Kesejahteraan yang sangat tinggi (${regionData.domains.Kesejahteraan.riskScore}), terutama pada metrik akses air bersih (hanya ${regionData.domains.Kesejahteraan.metrics[0].value}% vs. nasional ${regionData.domains.Kesejahteraan.metrics[0].nationalAverage}%) dan sanitasi layak (${regionData.domains.Kesejahteraan.metrics[1].value}% vs. nasional ${regionData.domains.Kesejahteraan.metrics[1].nationalAverage}%). Kondisi ini kemungkinan besar menjadi faktor pendorong utama tingginya prevalensi ISPA (${regionData.domains.Kesehatan.metrics[1].value}%) dan stunting (${regionData.domains.Gizi.metrics[0].value}%) yang jauh di atas rata-rata nasional. Kurangnya air bersih dan sanitasi meningkatkan risiko penyakit infeksi, yang secara langsung berdampak pada status gizi anak.\n\n`;
                insight += `**Hipotesis untuk Investigasi:**\nApakah intervensi yang berfokus pada perbaikan infrastruktur air dan sanitasi di ${regionData.name} akan memiliki dampak lebih signifikan dalam menurunkan angka stunting dan ISPA dibandingkan program gizi dan kesehatan yang berjalan sendiri-sendiri?`;
            } else if (regionData.name === 'Jawa Barat') {
                insight += `**Meskipun risiko Gizi dan Kesehatan relatif terkendali, ada potensi tantangan pada kualitas pengasuhan.** Data menunjukkan skor risiko Pengasuhan (${regionData.domains.Pengasuhan.riskScore}) lebih tinggi dibandingkan domain lainnya. Walaupun akses PAUD (${regionData.domains.Pengasuhan.metrics[0].value}%) sudah di atas rata-rata nasional, metrik 'Kualitas Pola Asuh' (${regionData.domains.Pengasuhan.metrics[1].value}) masih perlu ditingkatkan. Ini menunjukkan bahwa kuantitas akses belum tentu diimbangi oleh kualitas stimulasi di rumah.\n\n`;
                insight += `**Hipotesis untuk Investigasi:**\nApakah program PAUD di ${regionData.name} sudah cukup melibatkan orang tua dalam edukasi pola asuh yang berkualitas, atau fokusnya masih sebatas penitipan anak?`;
            } else {
                 insight += `**Profil risiko di ${regionData.name} menunjukkan tantangan yang merata di beberapa bidang, namun skor risiko Perlindungan (${regionData.domains.Perlindungan.riskScore}) relatif lebih baik.** Tingginya kasus kekerasan (${regionData.domains.Perlindungan.metrics[1].value} kasus) tetap menjadi perhatian, meskipun metrik kepemilikan akta kelahiran (${regionData.domains.Perlindungan.metrics[0].value}%) lebih baik dari rata-rata nasional. Ini bisa menandakan sistem pencatatan kasus yang sudah baik, namun memerlukan intervensi preventif.\n\n`;
                 insight += `**Hipotesis untuk Investigasi:**\nBagaimana strategi untuk menurunkan kasus kekerasan pada anak dapat diintegrasikan ke dalam layanan domain lain seperti Gizi (di Posyandu) dan Pengasuhan (di PAUD)?`;
            }
            
            resolve(insight);
        }, 1300);
    });
};

export const generateAllocationSuggestion = async (
    totalBudget: number,
    resourceData: ResourceData,
    highestRiskRegions: string[]
): Promise<string> => {
    const prompt = `
      You are an economic advisor for the Indonesian government specializing in resource optimization for public health programs, specifically PAUD HI.
      Your objective is to create an optimal resource allocation plan to maximize impact on reducing stunting and improving child health outcomes.

      **Current State & Constraints:**
      - **Total Available Budget:** ${totalBudget.toLocaleString('id-ID')} Miliar IDR.
      - **Highest Risk Regions (Priority):** ${highestRiskRegions.join(', ')}.
      - **Forecasted Demand (Deficit):**
        - **SDM:**
          ${resourceData.sdm.map(r => `- ${r.name}: butuh ${r.needed.toLocaleString('id-ID')} ${r.unit}`).join('\n          ')}
        - **Anggaran:**
          ${resourceData.anggaran.map(r => `- ${r.name}: butuh ${r.needed.toLocaleString('id-ID')} ${r.unit}`).join('\n          ')}
        - **Material:**
          ${resourceData.material.map(r => `- ${r.name}: butuh ${r.needed.toLocaleString('id-ID')} ${r.unit}`).join('\n          ')}

      **Task:**
      Based on the principles of cost-effectiveness and maximizing impact, provide a strategic resource allocation recommendation.
      1.  Start with a title and a 1-2 sentence summary of your strategic approach.
      2.  Provide a clear, actionable allocation plan broken down by **Anggaran**, **SDM**, and **Material**.
      3.  For each allocation, provide a brief justification ("*Justifikasi*") explaining why this allocation is optimal for impact.
      4.  Prioritize interventions that are proven to be effective for stunting and child health (e.g., specific nutrition, key health personnel).
      5.  Ensure the total proposed budget allocation does not exceed the available budget.
      6.  The entire response must be in Bahasa Indonesia and formatted as professional markdown.
    `;

    console.log("--- MOCK GEMINI PROMPT (ALLOCATION SUGGESTION) ---");
    console.log(prompt);
    console.log("-------------------------------------------------");
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockResponse = `
### Rekomendasi Alokasi Sumber Daya Optimal

Strategi ini memfokuskan alokasi pada intervensi gizi dan kesehatan yang paling berdampak tinggi di wilayah berisiko kritis, sambil mempertahankan program esensial lainnya. Tujuannya adalah mencapai penurunan stunting dan peningkatan kesehatan anak yang paling signifikan dengan budget yang tersedia.

---

#### **1. Alokasi Anggaran (Total: ${totalBudget} Miliar IDR)**

*   **Program Gizi (PMT & Edukasi): 12 Miliar IDR**
    *   *Justifikasi:* Investasi terbesar pada program gizi spesifik (PMT untuk balita dan ibu hamil) memberikan *return on investment* tertinggi dalam penurunan stunting. Dana ini difokuskan untuk wilayah prioritas: ${highestRiskRegions.join(', ')}.
*   **Program Kesehatan (Imunisasi & Pelatihan Nakes): 8 Miliar IDR**
    *   *Justifikasi:* Penguatan layanan kesehatan dasar, terutama imunisasi dan peningkatan kapasitas tenaga kesehatan (Nakes), adalah fondasi untuk mencegah penyakit yang dapat memperburuk kondisi gizi anak.
*   **Operasional & Logistik: 5 Miliar IDR**
    *   *Justifikasi:* Memastikan sumber daya material dan SDM dapat mencapai daerah sasaran secara efisien, terutama di wilayah dengan tantangan geografis.

#### **2. Prioritas Pengerahan SDM**

*   **Rekrutmen & Relokasi Ahli Gizi (Target: 100 orang)**
    *   *Justifikasi:* Ahli gizi adalah SDM paling krusial dan defisitnya paling tinggi. Pengerahan mereka ke puskesmas di ${highestRiskRegions[0]} dan ${highestRiskRegions[1]} akan menjadi ujung tombak intervensi gizi.
*   **Peningkatan Kapasitas Kader Posyandu (Target: 500 orang)**
    *   *Justifikasi:* Kader adalah pengganda dampak di tingkat komunitas. Pelatihan ulang tentang deteksi dini stunting dan PM-TBA adalah cara paling efisien untuk memperluas jangkauan program.

#### **3. Distribusi Material & Logistik**

*   **Prioritaskan Distribusi Paket PMT (Target: 50,000 paket)**
    *   *Justifikasi:* Mengatasi kebutuhan gizi yang paling mendesak. Distribusi harus dikawal ketat untuk memastikan sampai ke sasaran di wilayah kritis.
*   **Pastikan Ketersediaan Vaksin Lengkap (Target: 300,000 dosis)**
    *   *Justifikasi:* Mencegah wabah penyakit (PD3I) yang dapat membatalkan kemajuan program gizi. Rantai dingin (cold chain) di wilayah prioritas harus diaudit.
            `;
            resolve(mockResponse);
        }, 2000);
    });
};

export const generateScenarioAnalysis = async (params: ScenarioParams): Promise<string> => {
    const prompt = `
      You are a senior public policy analyst for the Indonesian government.
      Your task is to analyze the potential impact of a "what-if" scenario related to resource allocation for PAUD HI.

      **Scenario Details:**
      - **Budget Change:** Anggaran intervensi ${params.budgetChange > 0 ? `dinaikkan sebesar ${params.budgetChange}` : `dikurangi sebesar ${Math.abs(params.budgetChange)}`}%
      - **SDM Focus:** Prioritas pengerahan SDM difokuskan pada bidang **${params.sdmFocus}**.
      - **Regional Focus:** Alokasi diprioritaskan untuk wilayah **${params.regionFocus}**.

      **Task:**
      Provide a concise analysis of this scenario in well-structured markdown.
      1.  Start with a clear title summarizing the scenario.
      2.  Write a **Ringkasan Eksekutif** (1-2 sentences) of the most likely outcome.
      3.  Create a "Potensi Keuntungan" section listing 2-3 potential positive impacts.
      4.  Create a "Potensi Risiko" section listing 2-3 potential negative impacts or trade-offs.
      5.  Conclude with a "Rekomendasi Mitigasi" section, suggesting one key action to maximize benefits and minimize risks.
      6.  The entire response must be in Bahasa Indonesia.
    `;
    console.log("--- MOCK GEMINI PROMPT (SCENARIO ANALYSIS) ---");
    console.log(prompt);
    console.log("----------------------------------------------");

    return new Promise((resolve) => {
        setTimeout(() => {
            const mockResponse = `
### Analisis Skenario: ${params.budgetChange > 0 ? `Peningkatan Anggaran ${params.budgetChange}%` : `Pengurangan Anggaran ${Math.abs(params.budgetChange)}%`} dengan Fokus pada ${params.sdmFocus}

**Ringkasan Eksekutif:** Skenario ini berpotensi mengakselerasi pencapaian target di bidang ${params.sdmFocus} di wilayah ${params.regionFocus}, namun berisiko mengorbankan kemajuan di domain atau wilayah lain jika tidak diimbangi dengan strategi yang cermat.

---

#### **Potensi Keuntungan**

1.  **Akselerasi Target Spesifik:** Peningkatan fokus dan budget akan secara signifikan mempercepat pencapaian KPI di bidang ${params.sdmFocus} (misalnya, penurunan stunting jika fokus pada Gizi).
2.  **Dampak Terukur di Wilayah Prioritas:** Wilayah ${params.regionFocus} akan merasakan perbaikan layanan yang nyata, berpotensi menjadi 'success story' yang bisa direplikasi.
3.  **Efisiensi SDM:** Spesialisasi pengerahan SDM dapat meningkatkan keahlian dan efektivitas tim di lapangan karena mereka fokus pada satu domain.

#### **Potensi Risiko**

1.  **Zero-Sum Game:** Peningkatan di satu bidang mungkin menyebabkan stagnasi atau bahkan kemunduran di bidang lain yang kurang diprioritaskan, mengabaikan sifat holistik dan integratif PAUD HI.
2.  **Kesenjangan Antar Wilayah:** Jika fokus hanya pada 'High Risk', wilayah dengan risiko 'Sedang' yang berada di ambang batas bisa jadi terabaikan dan berubah menjadi 'Tinggi'.
3.  **Demotivasi SDM Non-Fokus:** Tenaga kerja di luar domain ${params.sdmFocus} mungkin merasa program mereka dikesampingkan, yang dapat menurunkan moral dan kinerja.

#### **Rekomendasi Mitigasi**

Untuk memaksimalkan dampak positif sambil meminimalkan risiko, alokasikan sebagian kecil (sekitar 10-15%) dari ${params.budgetChange > 0 ? 'tambahan' : 'sisa'} anggaran untuk program "penjaga gawang" (gatekeeper) di domain non-prioritas. Program ini bertujuan untuk mempertahankan capaian minimum dan memastikan tidak ada kemunduran signifikan saat fokus utama dialihkan.
            `;
            resolve(mockResponse);
        }, 1800);
    });
};

export const getParentingInsight = async (
    childProfile: ChildProfile,
    latestGrowth: GrowthRecord | null
): Promise<string> => {
    const prompt = `
      You are a friendly and encouraging early childhood development expert.
      Provide a short, personalized, and actionable tip for a parent based on their child's latest data.
      The child's name is ${childProfile.name}, age ${childProfile.age}.
      Latest measurement: Weight ${latestGrowth?.weight} kg, Height ${latestGrowth?.height} cm.
      Keep it concise (2-3 sentences) and in Bahasa Indonesia.
      Focus on a positive and encouraging tone.
    `;

    console.log("--- MOCK GEMINI PROMPT (PARENTING INSIGHT) ---");
    console.log(prompt);
    console.log("-----------------------------------------------");

    return new Promise((resolve) => {
        setTimeout(() => {
            let insight = `Halo Ayah/Bunda! Pertumbuhan ${childProfile.name} sudah bagus sekali! `;
            if (latestGrowth && latestGrowth.weight > 12) {
                insight += `Untuk mendukung aktivitasnya yang makin banyak, yuk ajak ${childProfile.name} bermain lempar tangkap bola untuk melatih koordinasi mata dan tangannya.`;
            } else {
                insight += `Terus berikan makanan bergizi seimbang ya. Coba kenalkan berbagai jenis sayuran dengan bentuk yang lucu agar ${childProfile.name} makin semangat makan!`;
            }
            resolve(insight);
        }, 1200);
    });
};