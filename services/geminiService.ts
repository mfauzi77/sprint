

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ActiveAlertData, KeyIndicatorData, RegionalForecastData, DomainFilter, RegionDetailData, ResourceData, ScenarioParams, ChildProfile, GrowthRecord, GroundingSource, MonthlySummaryData, DomainComparisonData } from "../types";

// In a real application, you would use:
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This is a mock implementation.
// To use with a real API, replace this with:
const ai = {
    models: {
        generateContent: async (params: any): Promise<any> => {
            console.log("Mock generateContent call with params:", params);
             await new Promise(resolve => setTimeout(resolve, 1500));
            return {
                text: "### Judul Rekomendasi Alokasi\n\nIni adalah respons placeholder dari mock AI. Untuk mendapatkan respons nyata, konfigurasikan API key Anda dan gunakan model `gemini-2.5-flash`.\n\n1.  **Alokasi A**: Detail alokasi...\n2.  **Alokasi B**: Detail alokasi...",
                candidates: [{
                    groundingMetadata: {
                        groundingChunks: [
                            { web: { uri: 'https://example.com/sumber1', title: 'Contoh Sumber dari Web 1' } },
                            { web: { uri: 'https://example.com/sumber2', title: 'Contoh Sumber dari Web 2' } }
                        ]
                    }
                }]
            };
        }
    }
};


export const getExecutiveBriefing = async (
    domain: DomainFilter,
    indicators: KeyIndicatorData[],
    alerts: ActiveAlertData[]
): Promise<string> => {
    const criticalAlerts = alerts.filter(a => a.level === 'CRITICAL');
    const highAlerts = alerts.filter(a => a.level === 'HIGH');

    // NOTE: The prompt is not being changed, only the mock response below.
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
      5.  The entire response must be in Bahasa Indonesia. Format as simple markdown. Add a "Dasar Analisis" section explaining your reasoning.
    `;

    // Mocking the API call and response with justification
    return new Promise((resolve) => {
        setTimeout(() => {
            let briefing = `### Ringkasan Eksekutif: Fokus pada ${domain}\n\n`;
            let justification = `### Dasar Analisis\n\n`;

            if (criticalAlerts.length > 0) {
                const topAlert = criticalAlerts[0];
                briefing += `**Situasi saat ini menunjukkan tantangan serius di bidang ${domain}, terutama terkait ${topAlert.title.toLowerCase()} di ${topAlert.region}.** Meskipun beberapa indikator makro seperti ${indicators[0].label} menunjukkan ${indicators[0].change > 0 ? 'perbaikan' : 'penurunan'}, munculnya ${criticalAlerts.length} alert level KRITIS menandakan adanya masalah akut di tingkat regional yang membutuhkan perhatian segera. Isu di ${topAlert.region} berisiko memburuk jika tidak ditangani cepat.\n\n`;
                briefing += `**Isu Paling Mendesak:**\n**${topAlert.title} di ${topAlert.region} (Skor Risiko: ${topAlert.riskScore})**. Ini adalah prioritas utama kita.\n\n`;
                briefing += `**Rekomendasi Strategis:**\nSegera bentuk tim respons cepat untuk memvalidasi data dan merumuskan rencana intervensi awal untuk ${topAlert.region} dalam 48 jam ke depan.`;

                justification += `1.  **Prioritas pada Dampak Terbesar:** Alert level 'KRITIS' dipilih sebagai isu utama karena menandakan risiko paling parah yang dapat berdampak luas pada kesejahteraan anak jika tidak segera ditangani.\n2.  **Prinsip Pencegahan Eskalasi:** Rekomendasi "tim respons cepat" bertujuan untuk mencegah masalah lokal menjadi krisis regional, yang sejalan dengan prinsip manajemen risiko proaktif.`;

            } else {
                briefing += `**Situasi bidang ${domain} secara umum terkendali, namun beberapa wilayah dengan risiko TINGGI perlu diwaspadai.** Indikator kunci seperti ${indicators[0].label} bergerak ke arah yang positif, yang mencerminkan keberhasilan program skala luas. Namun, adanya ${highAlerts.length} alert level TINGGI menunjukkan bahwa keberhasilan ini belum merata dan masih ada kantong-kantong masalah.\n\n`;
                briefing += `**Isu Paling Mendesak:**\nMencegah eskalasi risiko di wilayah dengan status 'Tinggi', khususnya di ${highAlerts.map(a => a.region).join(', ')}.\n\n`;
                briefing += `**Rekomendasi Strategis:**\nBagaimana kita bisa mereplikasi praktik baik dari wilayah yang stabil ke wilayah-wilayah yang masih menunjukkan risiko tinggi?`;
                
                justification += `1.  **Fokus pada Pencegahan:** Dengan tidak adanya alert 'KRITIS', fokus beralih ke pencegahan. Mencegah wilayah 'TINGGI' menjadi 'KRITIS' lebih efisien daripada menangani krisis.\n2.  **Pendekatan Berbasis Solusi:** Rekomendasi berfokus pada "replikasi praktik baik" untuk mendorong pendekatan yang positif dan berbasis solusi, bukan hanya pemadaman api.`;
            }
            resolve(briefing + '\n\n' + justification);
        }, 1200);
    });
};


// We simulate the API response for demonstration purposes.
export const getSmartRecommendations = async (alert: ActiveAlertData): Promise<string> => {
  console.log("Generating smart recommendations for:", alert);

  // NOTE: The prompt is not being changed, only the mock response below.
  const prompt = `
    You are an expert in public health policy for early childhood development in Indonesia.
    Based on the following health alert, provide a strategic justification and then three specific, actionable, and efficient intervention recommendations.
    Format the response as a well-structured markdown with a title, a justification section, and a numbered list of recommendations.

    Alert Details:
    - Issue: ${alert.title}
    - Region: ${alert.region}
    - Risk Score: ${alert.riskScore}
    ${alert.target ? `- Target: >${alert.target}%` : ''}
    ${alert.trend ? `- Trend: +${alert.trend}%` : ''}

    Provide recommendations that are contextual to Indonesia and consider resource constraints.
  `;

  // Mocking the API call and response
  return new Promise((resolve) => {
    setTimeout(() => {
        let response = `### Rekomendasi Intervensi untuk ${alert.title} di ${alert.region}\n\n`;
        let justification = `**Justifikasi Strategi:** Rekomendasi ini dirancang berdasarkan pendekatan multi-lapis yang menggabungkan (1) penjangkauan langsung ke sasaran yang paling sulit, (2) edukasi untuk perubahan perilaku berkelanjutan, dan (3) penguatan sistem layanan kesehatan dasar untuk memastikan keberlangsungan program.\n\n`;
        let recommendations = ``;
        if (alert.title.includes('Imunisasi')) {
            recommendations += `
1.  **Program "Kejar Imunisasi" Bergerak**: Luncurkan unit imunisasi mobile yang proaktif mengunjungi desa-desa dengan cakupan terendah. Libatkan kader Posyandu dan PKK untuk melakukan pemetaan dan pendataan anak yang belum diimunisasi lengkap. Berikan insentif kecil bagi kader yang berhasil mengajak 5 keluarga untuk melengkapi imunisasi anaknya.
2.  **Kampanye Edukasi Digital & Tokoh Masyarakat**: Buat konten edukasi singkat (video, infografis) tentang pentingnya imunisasi dan bahaya penyakit yang dapat dicegah (PD3I) dalam bahasa daerah. Sebarkan melalui WhatsApp Group, Facebook, dan gandeng tokoh agama/masyarakat sebagai juru bicara untuk mengatasi misinformasi dan keraguan.
3.  **Penguatan Sistem Rantai Dingin (Cold Chain)**: Lakukan audit dan perbaikan cepat pada fasilitas penyimpanan vaksin di Puskesmas Pembantu (Pustu) dan Poskesdes di wilayah ${alert.region}. Pastikan ketersediaan vaksin dan logistik pendukungnya tidak terhambat.
            `;
        } else if (alert.title.includes('ISPA') || alert.title.includes('DBD')) {
            justification = `**Justifikasi Strategi:** Fokus intervensi adalah pada pencegahan primer melalui perubahan perilaku (PHBS), pemberantasan sarang nyamuk (PSN), dan pengurangan faktor risiko lingkungan, serta deteksi dini di tingkat komunitas untuk mencegah kasus menjadi parah.\n\n`;
            recommendations += `
1.  **Edukasi & Gerakan 3M Plus**: Fokuskan penyuluhan pada perilaku hidup bersih dan sehat (PHBS) dan gerakan Menguras, Menutup, Mendaur ulang, plus mencegah gigitan nyamuk. Lakukan pembagian larvasida dan edukasi di Posyandu dan sekolah-sekolah di wilayah ${alert.region} yang mengalami tren peningkatan.
2.  **Aktivasi Juru Pemantau Jentik (Jumantik)**: Berdayakan kembali kader Jumantik di tingkat RT/RW untuk melakukan pemantauan rutin dan pencatatan. Berikan insentif sederhana untuk RT/RW dengan Angka Bebas Jentik (ABJ) tertinggi.
3.  **Peningkatan Kapasitas Deteksi Dini oleh Kader**: Latih kader Posyandu untuk mengenali tanda-tanda bahaya demam berdarah pada anak (seperti demam tinggi mendadak, pendarahan, atau lemas). Bekali mereka dengan alur rujukan yang jelas ke Puskesmas terdekat.
            `;
        } else {
            recommendations += `
1.  **Analisis Faktor Risiko Lokal**: Lakukan investigasi cepat untuk mengidentifikasi penyebab utama masalah di ${alert.region}.
2.  **Mobilisasi Kader Lokal**: Aktifkan kader Posyandu dan PKK untuk melakukan kunjungan dari rumah ke rumah.
3.  **Kolaborasi Lintas Sektor**: Adakan rapat koordinasi dengan dinas terkait (Pendidikan, Sosial) untuk merancang program bersama.
            `;
        }
      resolve(response + justification + recommendations);
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
    // NOTE: The prompt is not being changed, only the mock response below.
    const prompt = `...`;
    
    // Mocking the API call and response
    return new Promise((resolve) => {
        setTimeout(() => {
            let insight = `### Analisis Prediksi Risiko Bidang ${domain}\n\n`;
            insight += `Secara keseluruhan, prediksi **${horizon}** ke depan menunjukkan **${overallTrend > 0 ? 'peningkatan' : 'penurunan'} risiko** di bidang ${domain}. Perlu perhatian khusus pada wilayah dengan eskalasi tinggi, sambil mempelajari keberhasilan dari wilayah yang menunjukkan perbaikan.\n\n`;
            
            let justification = `### Dasar Analisis\n\n`;

            if (domain === 'Kesehatan' && overallTrend > 0) {
                 insight += `**Faktor Pendorong Tren:**\n`;
                 insight += `- **Potensi Faktor Musiman:** Peningkatan risiko kesehatan sejalan dengan potensi musim pancaroba yang dapat meningkatkan kasus ISPA atau penyakit menular lainnya.\n`;
                 insight += `- **Kewaspadaan Pasca-Liburan:** Mobilitas penduduk yang tinggi pasca periode liburan mungkin berkontribusi pada penyebaran penyakit jika tidak diimbangi dengan surveilans yang ketat.\n\n`;
                 justification += `- **Logika Tren:** Analisis ini didasarkan pada ekstrapolasi tren historis dan data perubahan rata-rata dari seluruh wilayah. Hipotesis mengenai faktor pendorong (musiman, liburan) didasarkan pada pola umum kesehatan masyarakat di Indonesia.\n`;
            } else if (domain === 'Gizi' && overallTrend < 0) {
                 insight += `**Faktor Pendorong Tren:**\n`;
                 insight += `- **Efek Program Gizi:** Tren penurunan risiko kemungkinan merupakan dampak positif dari program pemberian makanan tambahan (PMT) dan edukasi gizi yang telah berjalan.\n`;
                 insight += `- **Peningkatan Kesadaran:** Kesadaran masyarakat akan pentingnya gizi seimbang bagi balita yang terus meningkat.\n\n`;
                 justification += `- **Logika Tren:** Penurunan risiko diasumsikan berkorelasi dengan efektivitas program yang sedang berjalan. Analisis mengidentifikasi wilayah dengan perbaikan terbaik sebagai bukti potensial dari keberhasilan ini.\n`;
            } else {
                 insight += `**Faktor Pendorong Tren:**\n`;
                 insight += `- **Dinamika Program Lokal:** Implementasi program di tingkat daerah yang bervariasi dapat menjadi pendorong utama tren yang terlihat.\n`;
                 insight += `- **Kondisi Sosio-Ekonomi:** Perubahan kondisi ekonomi lokal dapat mempengaruhi kemampuan keluarga dalam mengakses layanan.\n\n`;
                  justification += `- **Logika Tren:** Karena tidak ada pola domain yang jelas, analisis ini mengasumsikan variabilitas lokal sebagai pendorong utama. Perbandingan antara 'Top Escalations' dan 'Top Improvements' memperkuat hipotesis ini.\n`;
            }

            insight += `**Analisis Wilayah Spesifik:**\n`;
            insight += `- **Eskalasi Tertinggi (${topIncreases.map(r => r.region).join(', ')}):** Kenaikan signifikan di wilayah ini memerlukan investigasi mendalam. Kemungkinan penyebabnya antara lain: kendala distribusi logistik kesehatan, penurunan aktivitas Posyandu, atau adanya kejadian luar biasa (KLB) lokal yang belum teridentifikasi.\n`;
            insight += `- **Perbaikan Terbaik (${topDecreases.map(r => r.region).join(', ')}):** Wilayah ini menunjukkan potensi keberhasilan intervensi. Perlu dipelajari apakah ada inovasi program, penguatan kapasitas kader, atau kampanye lokal yang efektif yang bisa direplikasi di wilayah lain.\n\n`;
            
            insight += `**Rekomendasi Awal:**\nFokuskan alokasi sumber daya pengawasan dan intervensi dini ke wilayah-wilayah yang diprediksi mengalami eskalasi risiko. Lakukan studi kasus cepat di wilayah yang menunjukkan perbaikan untuk mengidentifikasi praktik terbaik.`;

            resolve(insight + '\n\n' + justification);
        }, 1500); // Simulate network delay
    });
};

export const getRegionalAnalysisInsight = async (
    regionData: RegionDetailData
): Promise<string> => {
    // NOTE: The prompt is not being changed, only the mock response below.
    const prompt = `...`;
    
    // Mocking the API call and response
    return new Promise((resolve) => {
        setTimeout(() => {
            let insight = `### Analisis Ketergantungan Data untuk ${regionData.name}\n\n`;
            let justification = `### Dasar Analisis\n\n`;
            
            if (regionData.name === 'Papua') {
                insight += `**Korelasi kuat teridentifikasi antara rendahnya akses layanan dasar (Kesejahteraan) dengan tingginya risiko Kesehatan dan Gizi.** Wilayah ${regionData.name} menunjukkan skor risiko Kesejahteraan yang sangat tinggi (${regionData.domains.Kesejahteraan.riskScore}), terutama pada metrik akses air bersih (hanya ${regionData.domains.Kesejahteraan.metrics[0].value}% vs. nasional ${regionData.domains.Kesejahteraan.metrics[0].nationalAverage}%) dan sanitasi layak (${regionData.domains.Kesejahteraan.metrics[1].value}% vs. nasional ${regionData.domains.Kesejahteraan.metrics[1].nationalAverage}%). Kondisi ini kemungkinan besar menjadi faktor pendorong utama tingginya prevalensi ISPA (${regionData.domains.Kesehatan.metrics[1].value}%) dan stunting (${regionData.domains.Gizi.metrics[0].value}%) yang jauh di atas rata-rata nasional. Kurangnya air bersih dan sanitasi meningkatkan risiko penyakit infeksi, yang secara langsung berdampak pada status gizi anak.\n\n`;
                insight += `**Hipotesis untuk Investigasi:**\nApakah intervensi yang berfokus pada perbaikan infrastruktur air dan sanitasi di ${regionData.name} akan memiliki dampak lebih signifikan dalam menurunkan angka stunting dan ISPA dibandingkan program gizi dan kesehatan yang berjalan sendiri-sendiri?`;
                justification += `Analisis ini menghubungkan data dari domain **Kesejahteraan** (sebab) dengan **Kesehatan** dan **Gizi** (akibat). Logikanya didasarkan pada teori kesehatan masyarakat yang mapan, di mana sanitasi yang buruk dan kurangnya air bersih merupakan faktor risiko utama untuk penyakit infeksi dan diare, yang keduanya merupakan penyebab signifikan dari malnutrisi dan stunting.`;
            } else if (regionData.name === 'DKI Jakarta') {
                insight += `**Risiko Kesejahteraan terkait kepadatan penduduk menjadi pemicu masalah Kesehatan di DKI Jakarta.** Tingginya skor risiko pada domain Kesejahteraan (${regionData.domains.Kesejahteraan.riskScore}), khususnya terkait kepadatan pemukiman, berkorelasi langsung dengan tingginya prevalensi ISPA (${regionData.domains.Kesehatan.metrics[1].value}%). **Selain itu, data domain Lingkungan menunjukkan adanya Peringatan Dini Banjir Rob (risiko ${regionData.domains.Lingkungan?.riskScore}), yang dapat memperburuk kondisi sanitasi dan meningkatkan risiko penyakit menular.**\n\n`;
                insight += `**Hipotesis untuk Investigasi:**\nApakah program penataan pemukiman dan mitigasi banjir di area padat penduduk akan lebih efektif menekan risiko kesehatan jangka panjang dibandingkan intervensi kuratif saja?`;
                justification += `Analisis ini menggabungkan data dari domain **Kesejahteraan**, **Kesehatan**, dan **Lingkungan**. Logikanya adalah bahwa kepadatan penduduk yang tinggi (Kesejahteraan) mempercepat penyebaran penyakit (Kesehatan), dan risiko lingkungan seperti banjir (Lingkungan) bertindak sebagai pengganda risiko (risk multiplier) dengan merusak sanitasi dan memicu wabah.`;
            } else if (regionData.name === 'Sulawesi Selatan') {
                insight += `**Teridentifikasi korelasi antara data Kesejahteraan dari BPS dan data Pendidikan dari Dapodik.** Tingkat kemiskinan di ${regionData.name} yang masih relatif tinggi (${regionData.domains.Kesejahteraan.metrics.find(m => m.label.includes('Kemiskinan'))?.value || 'N/A'}%) berpotensi menjadi penghalang akses ke layanan PAUD berkualitas. Hal ini tercermin dari Rasio Guru:Murid PAUD (${regionData.domains.Pengasuhan.metrics.find(m => m.label.includes('Rasio'))?.value || 'N/A'}) yang lebih tinggi dari standar ideal, menandakan kemungkinan adanya keterbatasan sumber daya di satuan pendidikan.\n\n`;
                insight += `**Hipotesis untuk Investigasi:**\nApakah program bantuan sosial (seperti PKH) di ${regionData.name} sudah terintegrasi efektif dengan program dukungan biaya operasional PAUD untuk mengurangi beban biaya bagi keluarga miskin?`;
                justification += `Analisis ini secara eksplisit menghubungkan data dari sumber eksternal yang baru diintegrasikan: **data kemiskinan (BPS)** dengan **data rasio guru (Dapodik)**. Logikanya adalah bahwa tekanan ekonomi (kemiskinan) dapat memaksa sekolah (PAUD) untuk beroperasi dengan sumber daya minimal, yang tercermin dalam rasio guru-murid yang tidak ideal, sehingga berdampak pada kualitas pengasuhan.`;
            } else {
                 insight += `**Profil risiko di ${regionData.name} menunjukkan tantangan yang merata di beberapa bidang, namun skor risiko Perlindungan (${regionData.domains.Perlindungan.riskScore}) relatif lebih baik.** Tingginya kasus kekerasan (${regionData.domains.Perlindungan.metrics[1].value} kasus) tetap menjadi perhatian, meskipun metrik kepemilikan akta kelahiran (${regionData.domains.Perlindungan.metrics[0].value}%) lebih baik dari rata-rata nasional. Ini bisa menandakan sistem pencatatan kasus yang sudah baik, namun memerlukan intervensi preventif.\n\n`;
                 insight += `**Hipotesis untuk Investigasi:**\nBagaimana strategi untuk menurunkan kasus kekerasan pada anak dapat diintegrasikan ke dalam layanan domain lain seperti Gizi (di Posyandu) dan Pengasuhan (di PAUD)?`;
                 justification += `Analisis ini mengidentifikasi anomali dalam domain **Perlindungan**: metrik administratif ('Akta Kelahiran') baik, tetapi metrik insiden ('Kasus Kekerasan') buruk. Ini menunjukkan bahwa masalahnya bukan pada administrasi, melainkan pada aspek sosial yang memerlukan intervensi preventif, bukan hanya reaktif atau pencatatan.`;
            }
            
            resolve(insight + '\n\n' + justification);
        }, 1300);
    });
};

export const generateAllocationSuggestion = async (
    totalBudget: number,
    resourceData: ResourceData,
    highestRiskRegions: string[]
): Promise<{ content: string; sources: GroundingSource[] }> => {
    const prompt = `
      You are an economic advisor for the Indonesian government specializing in resource optimization for public health programs, specifically PAUD HI.
      Your objective is to create an optimal resource allocation plan to maximize impact on reducing stunting and improving child health outcomes.

      Current State & Constraints:
      - Total Available Budget: ${totalBudget.toLocaleString('id-ID')} Miliar IDR.
      - Highest Risk Regions (Priority): ${highestRiskRegions.join(', ')}.
      - Forecasted Demand (Deficit):
        - SDM:
          ${resourceData.sdm.map(r => `- ${r.name}: butuh ${r.needed.toLocaleString('id-ID')} ${r.unit}`).join('\n          ')}
        - Anggaran:
          ${resourceData.anggaran.map(r => `- ${r.name}: butuh ${r.needed.toLocaleString('id-ID')} ${r.unit}`).join('\n          ')}
        - Material:
          ${resourceData.material.map(r => `- ${r.name}: butuh ${r.needed.toLocaleString('id-ID')} ${r.unit}`).join('\n          ')}

      Task:
      Based on the principles of cost-effectiveness and maximizing impact, provide a strategic resource allocation recommendation.
      1. Start with a title and a 1-2 sentence summary of your strategic approach.
      2. Provide a clear, actionable allocation plan broken down by Anggaran, SDM, and Material.
      3. For each allocation, provide a brief justification ("Justifikasi") explaining why this allocation is optimal for impact.
      4. Prioritize interventions that are proven to be effective for stunting and child health.
      5. Use Google Search to find and cite the latest Indonesian government regulations (Peraturan Pemerintah), presidential decrees (Perpres), or ministerial regulations (Permenkes/Permendikbud) related to stunting prevention, PAUD-HI, and national health budgets. Base your recommendations on these official sources.
      6. Ensure the total proposed budget allocation does not exceed the available budget.
      7. The entire response must be in Bahasa Indonesia and formatted as professional markdown.
    `;
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{googleSearch: {}}],
            },
        });
        
        const content = response.text;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
        const sources: GroundingSource[] = groundingChunks
            .filter(chunk => chunk.web?.uri && chunk.web?.title)
            .map(chunk => ({
                web: {
                    uri: chunk.web!.uri!,
                    title: chunk.web!.title!,
                }
            }));

        return { content, sources };
    } catch (e) {
        console.error("Gemini API call failed in generateAllocationSuggestion", e);
        throw new Error("Failed to generate suggestion from AI. Check API key and network.");
    }
};

export const generateScenarioAnalysis = async (params: ScenarioParams): Promise<{ content: string, sources: GroundingSource[] }> => {
    const prompt = `
      You are a senior public policy analyst for the Indonesian government.
      Your task is to analyze the potential impact of a "what-if" scenario related to resource allocation for PAUD HI.

      Scenario Details:
      - Budget Change: Anggaran intervensi ${params.budgetChange > 0 ? `dinaikkan sebesar ${params.budgetChange}` : `dikurangi sebesar ${Math.abs(params.budgetChange)}`}%
      - SDM Focus: Prioritas pengerahan SDM difokuskan pada bidang **${params.sdmFocus}**.
      - Regional Focus: Alokasi diprioritaskan untuk wilayah **${params.regionFocus}**.

      Task:
      Provide a concise analysis of this scenario in well-structured markdown.
      1. Start with a clear title summarizing the scenario.
      2. Write a "Ringkasan Eksekutif" (1-2 sentences) of the most likely outcome.
      3. Create a "Potensi Keuntungan" section listing 2-3 potential positive impacts.
      4. Create a "Potensi Risiko" section listing 2-3 potential negative impacts or trade-offs.
      5. Conclude with a "Rekomendasi Mitigasi" section, suggesting one key action to maximize benefits and minimize risks.
      6. Use Google Search to incorporate recent news, official government statements, or policy shifts in Indonesia that could affect this scenario's outcome. Cite your sources.
      7. The entire response must be in Bahasa Indonesia.
    `;
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        
        const content = response.text;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
        const sources: GroundingSource[] = groundingChunks
            .filter(chunk => chunk.web?.uri && chunk.web?.title)
            .map(chunk => ({
                web: {
                    uri: chunk.web!.uri!,
                    title: chunk.web!.title!,
                }
            }));

        return { content, sources };
    } catch (e) {
        console.error("Gemini API call failed in generateScenarioAnalysis", e);
        throw new Error("Failed to generate scenario analysis from AI. Check API key and network.");
    }
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

    // Mocking the API call and response
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

export const getMonthlyPerformanceInsight = async (
    monthName: string,
    summary: MonthlySummaryData
): Promise<string> => {
    const prompt = `
        You are a public policy analyst for PAUD-HI Indonesia.
        Summarize the national performance for ${monthName}.
        - National Risk: ${summary.nationalRisk.score}, change ${summary.nationalRisk.change}.
        - Top Improvers: ${summary.topImprovingRegions.map(r => r.name).join(', ')}.
        - Top Worseners: ${summary.topWorseningRegions.map(r => r.name).join(', ')}.
        Provide an executive summary and a justification in structured markdown and Bahasa Indonesia.
    `;
    // Mocking the API call and response
    return new Promise(resolve => {
        setTimeout(() => {
            const trendText = summary.nationalRisk.change > 0 ? 'sedikit memburuk' : 'menunjukkan perbaikan';
            const insight = `### Ringkasan Kinerja Bulan ${monthName}
            
**Analisis Umum:** Secara keseluruhan, kinerja nasional pada bulan ${monthName} ${trendText}, dengan skor risiko nasional berada di angka **${summary.nationalRisk.score.toFixed(1)}** (perubahan ${summary.nationalRisk.change.toFixed(1)} poin). Meskipun beberapa indikator kunci seperti **${summary.keyIndicators[0].label}** menunjukkan tren positif, perhatian khusus diperlukan pada wilayah yang mengalami pemburukan risiko.

**Wilayah Berkinerja Terbaik:** Wilayah seperti **${summary.topImprovingRegions[0].name}** dan **${summary.topImprovingRegions[1].name}** menunjukkan perbaikan signifikan. Praktik baik dari wilayah ini, kemungkinan terkait intervensi lokal yang efektif, perlu dipelajari dan direplikasi.

**Wilayah Perlu Perhatian:** Sebaliknya, wilayah **${summary.topWorseningRegions[0].name}** dan **${summary.topWorseningRegions[1].name}** mengalami eskalasi risiko. Perlu dilakukan validasi lapangan untuk mengidentifikasi akar masalah, apakah terkait kendala logistik, penurunan aktivitas kader, atau faktor eksternal lainnya.

**Rekomendasi:** Lakukan rapat koordinasi mingguan untuk membahas wilayah dengan tren memburuk dan alokasikan tim pendamping untuk investigasi cepat.`;

            const justification = `### Dasar Analisis

Analisis ini didasarkan pada perbandingan data bulan ini dengan bulan sebelumnya. Poin-poin kunci disorot dengan membandingkan skor risiko nasional secara agregat dan mengidentifikasi pencilan (outliers) pada tingkat regional. Wilayah dengan perubahan terbesar (positif dan negatif) dipilih sebagai "Top Movers" karena mereka memberikan sinyal paling kuat tentang dinamika program di lapangan, baik itu keberhasilan yang perlu direplikasi maupun kegagalan yang perlu segera ditangani.`;
            resolve(insight + '\n\n' + justification);
        }, 1200)
    });
};

export const getDomainComparisonInsight = async (
    year: number,
    comparisonData: DomainComparisonData
): Promise<string> => {
     const prompt = `
        You are a public policy analyst for PAUD-HI Indonesia.
        Provide a comparative analysis across all service domains for the year ${year}.
        Data: ${JSON.stringify(comparisonData.stats)}
        Highlight the most challenging domain and the most stable one.
        Provide an executive summary and justification in structured markdown and Bahasa Indonesia.
    `;
    // Mocking the API call and response
    return new Promise(resolve => {
        setTimeout(() => {
            const sortedByRisk = [...comparisonData.stats].sort((a,b) => b.averageRisk - a.averageRisk);
            const highestRiskDomain = sortedByRisk[0];
            const lowestRiskDomain = sortedByRisk[sortedByRisk.length - 1];

            const insight = `### Analisis Perbandingan Antar Domain Tahun ${year}

**Tantangan Utama:** Berdasarkan data, bidang **${highestRiskDomain.domain}** menunjukkan tantangan terbesar secara nasional dengan rata-rata skor risiko tertinggi (**${highestRiskDomain.averageRisk.toFixed(1)}**) dan jumlah wilayah kritis terbanyak (${highestRiskDomain.criticalRegionsCount}). Ini mengindikasikan bahwa isu-isu terkait ${highestRiskDomain.domain.toLowerCase()} masih menjadi prioritas utama yang memerlukan intervensi skala besar dan terstruktur.

**Bidang Paling Stabil:** Di sisi lain, bidang **${lowestRiskDomain.domain}** menunjukkan kondisi paling stabil dengan skor risiko rata-rata terendah (**${lowestRiskDomain.averageRisk.toFixed(1)}**). Keberhasilan di bidang ini dapat menjadi model untuk diterapkan pada domain lain, terutama dalam hal manajemen data dan implementasi program di tingkat regional.

**Kesenjangan Kinerja:** Kesenjangan kinerja yang signifikan terlihat di semua domain. Contohnya di bidang **${highestRiskDomain.domain}**, wilayah ${highestRiskDomain.bestPerformer.name} berhasil menekan risiko, sementara ${highestRiskDomain.worstPerformer.name} masih sangat tertinggal. Ini menyoroti pentingnya intervensi yang disesuaikan dengan konteks lokal.

**Rekomendasi Strategis:** Alokasikan sumber daya tambahan untuk mengatasi masalah di bidang **${highestRiskDomain.domain}**. Lakukan studi kasus mendalam pada wilayah berkinerja terbaik dan terburuk di setiap domain untuk mengidentifikasi faktor keberhasilan dan kegagalan yang dapat digeneralisasi.`;

             const justification = `### Dasar Analisis

Analisis ini menggunakan pendekatan perbandingan relatif. Domain diurutkan berdasarkan **rata-rata skor risiko** untuk mengidentifikasi masalah paling sistemik secara nasional. Penggunaan metrik **'jumlah wilayah kritis'** memperkuat temuan ini dengan menyoroti skala masalah. Penyorotan 'Best vs Worst Performer' di setiap domain bertujuan untuk menunjukkan bahwa bahkan di dalam domain yang menantang sekalipun, ada contoh keberhasilan yang dapat dipelajari, mendorong pendekatan berbasis solusi.`;

            resolve(insight + '\n\n' + justification);
        }, 1200)
    });
};
