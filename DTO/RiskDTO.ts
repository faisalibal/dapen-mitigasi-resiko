export interface ResikoInherentDTO {
  DAMPAK_INHERENT: string;
  ID_API: string;
  KD_FUNGSI: string;
  KD_RESIKO: string;
  LINE_NO: string;
  NAMA_FUNGSI: string;
  NILAI_INHERENT: string;
  OBJECTIVE: string;
  PROBABILITAS_INHERENT: string;
  RESIKO: string;
}

export interface ResikoMitigasiDTO {
  DAMPAK_MITIGASI: string;
  ID: string;
  KD_FUNGSI: string;
  KD_RESIKO: string;
  LINE_NO: string;
  NAMA_FUNGSI: string;
  NILAI_MITIGASI: string;
  OBJECTIVE: string;
  PROBABILITAS_MITIGASI: string;
  RESIKO: string;
}

export interface RisikoDetailkDTO {
  ada: string;
  akibat_qualitative: string;
  akibat_rp: number;
  berjalan: string;
  berlaku_mulai: string;
  dampak_inherent: string;
  dampak_inherent_thn_lalu: string;
  dampak_mitigasi: string;
  dampak_mitigasi_thn_lalu: string;
  fungsi_terkait: string;
  fungsi_terkait_semua: string;
  id: string;
  id_fungsi: string;
  id_kategori: string;
  id_pic_resiko: string;
  id_resiko: string;
  id_respon: string;
  kandidat_top_risk: string;
  kategori: string;
  level_of_risk_inherent: string;
  level_of_risk_inherent_thn_lalu: string;
  level_of_risk_mitigasi: string;
  level_of_risk_mitigasi_thn_lalu: string;
  line_no: string;
  memadai: string;
  nama_fungsi: string;
  objective: string;
  pemilik_resiko: string;
  penyebab: string[];
  pic_resiko: string;
  prob_inherent: string;
  prob_inherent_thn_lalu: string;
  prob_mitigasi: string;
  prob_mitigasi_thn_lalu: string;
  respon_resiko: string;
  risk_event: string;
  treatment: string[];
  year: number;
}

export interface DepartmentDTO {
  KD_FUNGSI: string;
  NAMA_FUNGSI: string;
  JUMLAH_REGISTER: string;
}

export type ColumnItem = {
  color: string;
  nilai: string;
  id: string;
  dampak: string;
  probabilitas: string;
  label: string;
  legend: string;
};

// Define the type for each item in the "ChartOption" array
export type ChartOptionItem = {
  columnId: string;
  column: ColumnItem[];
  dampak: string;
};
