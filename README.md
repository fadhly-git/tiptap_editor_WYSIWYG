# 📝 tiptap_editor_WYSIWYG

Rich Text Editor modern & profesional berbasis **React**, **TypeScript**, **TailwindCSS**, dan **Tiptap.dev**. Mendukung editing teks lengkap, media, table, serta fitur produktivitas tinggi.

![Rich Text Editor](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.4)

---

## ✨ Fitur Utama

- **Formatting Lengkap:** Bold, Italic, Underline, Strikethrough, Alignment, Warna, Font, Heading.
- **Struktur:** Bullet/Numbered List, Blockquote, Code, Horizontal Rule.
- **Media:** Link, Gambar (upload/URL/drag-drop), Tabel interaktif.
- **Produktivitas:** Undo/Redo, Auto-save, Preview, Export HTML/Text, Counter karakter.
- **Pengalaman Pengguna:** Responsive, Shortcuts, UI modern, Error Handling.

## 🚀 Instalasi

### Prasyarat
- Node.js >= 16
- pnpm (direkomendasikan) / npm

### Langkah Instalasi
```bash
git clone https://github.com/fadhly-git/tiptap_editor_WYSIWYG.git
cd tiptap_editor_WYSIWYG
pnpm install # atau npm install
pnpm dev     # atau npm run dev
```
Akses pada [http://localhost:5173](http://localhost:5173)

### Build Production
```bash
pnpm build # atau npm run build
```
Output build berada di folder `dist/`.

## 🛠️ Teknologi
- **React 18**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **Tiptap.dev** & **ProseMirror**
- **Lucide React**, **Radix UI**, **React Colorful**

## 📖 Penggunaan

1. Mulai menulis di area editor.
2. Gunakan toolbar/shortcut untuk format teks.
3. Insert gambar, tabel, link via toolbar.
4. Preview hasil akhir sebelum export/publish.

**Shortcuts:**
- Ctrl+B: Bold
- Ctrl+I: Italic
- Ctrl+U: Underline
- Ctrl+Z/Y: Undo/Redo
- Ctrl+S: Simpan

## 🎯 Contoh Penggunaan

- Penulisan blog/artikel
- Dokumentasi teknis
- Email/newsletter
- Proposal bisnis

## 🔧 Kustomisasi

### Tema & Styling
Ubah file `src/index.css` untuk custom styling Tailwind.

### Extensions
Tambah/ubah Tiptap Extension di `src/components/RichTextEditor.tsx`.

## 🔒 Keamanan

- Proteksi XSS & sanitasi konten
- Validasi file upload

## 🐛 Troubleshooting

- Pastikan dependency sudah terinstall & build sukses
- Jika toolbar/error, cek konsol & cache browser
- Upload gambar: Maks 10MB, tipe PNG/JPG/GIF

## 🤝 Kontribusi

Kontribusi sangat terbuka!
1. Fork repository & buat branch baru
2. Commit & push perubahan
3. Ajukan Pull Request

## 📄 Lisensi

MIT License, lihat file `LICENSE`.

## 🙏 Kredit & Resource

- [Tiptap.dev](https://tiptap.dev/)
- [ProseMirror](https://prosemirror.net/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/)
- [React Colorful](https://github.com/omgovich/react-colorful)

## 📞 Support

- [Buat Issue](https://github.com/fadhly-git/tiptap_editor_WYSIWYG/issues)
- Email: rocevutnod@gmail.com

---

**Dibuat dengan ❤️ oleh [fadhly-git](https://github.com/fadhly-git) menggunakan React & Tiptap.dev**
