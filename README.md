# 📝 Rich Text Editor - Editor WYSIWYG Modern

Aplikasi rich text editor yang lengkap dan professional menggunakan React, TypeScript, TailwindCSS, dan Tiptap.dev. Editor ini menyediakan semua fitur yang diperlukan untuk pengeditan teks yang canggih dengan antarmuka yang intuitif dan modern.

![Rich Text Editor](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.4)

## ✨ Fitur Utama

### 🎨 Formatting Teks Lengkap
- **Bold, Italic, Underline, Strikethrough** - Formatting dasar dengan keyboard shortcuts
- **Text Alignment** - Rata kiri, tengah, kanan, dan justify
- **Text & Background Colors** - Color picker yang canggih dengan hex input
- **Font Family** - Berbagai pilihan font (Inter, Arial, Helvetica, Times, dll)
- **Headings** - Support H1-H6 dengan styling yang konsisten

### 📋 List dan Struktur
- **Bullet Lists** - Daftar poin dengan indentasi otomatis
- **Numbered Lists** - Daftar berurutan dengan numbering otomatis
- **Blockquotes** - Kutipan dengan styling khusus
- **Code Inline & Block** - Formatting kode dengan syntax highlighting
- **Horizontal Rules** - Garis pembagi untuk struktur konten

### 🔗 Media dan Link
- **Link Management** - Insert dan edit link dengan preview
- **Image Insertion** - Upload gambar atau URL dengan alt text
- **Table Creation** - Pembuat tabel interaktif dengan resize
- **Drag & Drop** - Upload gambar dengan drag and drop

### ⚡ Fitur Produktivitas
- **Undo/Redo** - Sistem undo/redo yang robust (Ctrl+Z/Y)
- **Character Count** - Penghitung karakter dan kata real-time
- **Auto-save** - Menyimpan perubahan secara otomatis
- **Preview Mode** - Mode preview untuk melihat hasil akhir
- **Export Options** - Export ke HTML dan Text

### 💻 Pengalaman Pengguna
- **Responsive Design** - Bekerja sempurna di desktop dan mobile
- **Keyboard Shortcuts** - Shortcuts standar untuk produktivitas
- **Professional UI** - Antarmuka modern dengan UX yang intuitif
- **Error Handling** - Penanganan error yang graceful

## 🚀 Instalasi dan Setup

### Prasyarat
- Node.js (versi 16 atau lebih baru)
- pnpm (recommended) atau npm

### Langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone [https://github.com/fadhly-git/tiptap_editor_WYSIWYG.git]
   cd rich-text-editor
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   # atau
   npm install
   ```

3. **Run Development Server**
   ```bash
   pnpm dev
   # atau
   npm run dev
   ```

4. **Buka Browser**
   ```
   http://localhost:5173
   ```

### Build untuk Production

```bash
pnpm build
# atau
npm run build
```

File hasil build akan tersedia di folder `dist/`.

## 🛠️ Teknologi yang Digunakan

### Core Technologies
- **React 18.3** - Library UI modern dengan hooks
- **TypeScript** - Type safety dan developer experience
- **Vite** - Build tool yang cepat dan modern
- **TailwindCSS** - Utility-first CSS framework

### Rich Text Editor
- **Tiptap.dev** - Framework editor yang extensible
- **ProseMirror** - Schema-driven rich text editing
- **React Colorful** - Color picker component

### UI Components
- **Lucide React** - Icon library yang modern
- **Radix UI** - Accessible UI primitives
- **Custom Components** - Dialog, ColorPicker, dll

## 📖 Cara Penggunaan

### Basic Editing
1. **Menulis Konten** - Klik di area editor dan mulai menulis
2. **Format Teks** - Gunakan toolbar atau keyboard shortcuts
3. **Insert Media** - Klik tombol Image/Table/Link di toolbar
4. **Preview** - Klik tombol "Preview" untuk melihat hasil

### Keyboard Shortcuts
- `Ctrl+B` - **Bold**
- `Ctrl+I` - *Italic*
- `Ctrl+U` - Underline
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo
- `Ctrl+S` - Save Document

### Fitur Lanjutan
- **Color Picker** - Klik icon warna untuk memilih warna teks/background
- **Table Editor** - Klik icon table, pilih ukuran, insert ke editor
- **Image Upload** - Drag & drop atau browse file untuk upload gambar
- **Link Editor** - Insert link dengan preview dan opsi target

## 🎯 Use Cases

### Blog Writing
- Menulis artikel blog dengan formatting lengkap
- Insert gambar dan link untuk konten yang kaya
- Export ke HTML untuk publishing

### Documentation
- Membuat dokumentasi teknis dengan table dan code blocks
- Struktur heading untuk navigasi yang baik
- Export untuk berbagai platform

### Content Creation
- Newsletter dan email marketing
- Press release dan announcement
- Educational materials

### Business Documents
- Proposal dan presentasi
- Reports dengan table dan chart
- Memo dan komunikasi internal

## 🔧 Kustomisasi

### Tema dan Styling
Editor menggunakan TailwindCSS yang mudah dikustomisasi. Edit file `src/index.css` untuk mengubah styling:

```css
/* Custom editor styles */
.ProseMirror {
  /* Sesuaikan styling editor */
}
```

### Extensions
Tambah Tiptap extensions di `src/components/RichTextEditor.tsx`:

```tsx
import CustomExtension from '@tiptap/extension-custom'

const editor = useEditor({
  extensions: [
    // ... existing extensions
    CustomExtension.configure({
      // options
    })
  ]
})
```

## 📱 Responsive Design

Editor dirancang untuk bekerja optimal di berbagai ukuran layar:

- **Desktop** - Full toolbar dengan semua fitur
- **Tablet** - Toolbar yang optimized untuk touch
- **Mobile** - Compact layout dengan scrollable toolbar

## 🔒 Security

- **XSS Protection** - Content sanitization otomatis
- **Safe HTML** - Hanya HTML tags yang aman yang diperbolehkan
- **File Upload** - Validasi file type untuk keamanan

## 🐛 Troubleshooting

### Common Issues

**Editor tidak muncul**
- Pastikan semua dependencies ter-install dengan benar
- Check console untuk error messages

**Toolbar tidak responsive**
- Clear browser cache dan reload
- Pastikan TailwindCSS ter-load dengan benar

**File upload gagal**
- Check file size (max 10MB)
- Pastikan file type yang supported (PNG, JPG, GIF)

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Tiptap.dev](https://tiptap.dev/) - Excellent rich text editor framework
- [ProseMirror](https://prosemirror.net/) - Robust rich text editing toolkit
- [TailwindCSS](https://tailwindcss.com/) - Beautiful utility-first CSS
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [React Colorful](https://github.com/omgovich/react-colorful) - Color picker component

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

- Buat [GitHub Issue](link-to-issues)
- Email: support@example.com
- Documentation: [Link to docs]

---

**Dibuat dengan ❤️ menggunakan React dan Tiptap.dev**
# tiptap_editor_WYSIWYG
