# American Hospital Case Study — Kullanıcı Yönetim Paneli

Sağlık kuruluşları için kullanıcı rollerini ve izinlerini yönetmeye yönelik bir case study.

## Teknoloji Tercihleri

- **React + Vite + TypeScript:** Hızlı HMR, strict mode ile tip güvenliği.
- **Redux Toolkit:** `createEntityAdapter` ile normalize state, `createAsyncThunk` ile async akışlar. Context API'ye kıyasla DevTools desteği ve ölçeklenebilirlik avantajı var.
- **Tailwind CSS:** Utility-first, component'e baktığında stilin ne olduğu doğrudan görünüyor.
- **Headless UI:** Modal, Listbox gibi bileşenlerde A11y desteği (focus trap, keyboard nav, ARIA) hazır geliyor.
- **React Hook Form + Zod:** Uncontrolled form yaklaşımı, şema tabanlı validasyon.
- **Vitest + RTL:** Vite-native, ayrı Jest config'i gerektirmiyor.

## Klasör Yapısı

```
src/
├── api/                    # Mock API (setTimeout ile gecikme)
├── components/ui/          # Paylaşılan atomik bileşenler
├── features/users/         # Kullanıcı modülü (slice, hook, component, test, type)
├── hooks/                  # Typed Redux hookları
├── store/                  # Store config
├── test/                   # Test setup
└── utils/                  # debounce, formatDate
```

Feature-based yapı: her modül kendi slice/hook/component/type'larını barındırıyor. Yeni modül eklemek mevcut koda dokunmayı gerektirmiyor. İş mantığı `useUserManagement` hook'unda, UI bileşenleri stateless.

## Kod Standartları

- **Dosya adları:** Bileşenler PascalCase, hook'lar `use` prefix'i ile camelCase, util'ler camelCase.
- **State organizasyonu:** Tek slice dosyasında action, reducer, selector, thunk bir arada. Selector'lar `createEntityAdapter.getSelectors()`'dan geliyor. Typed hook'lar (`useAppDispatch`, `useAppSelector`) `hooks/useRedux.ts`'de.
- **Stil:** Tailwind utility class'ları doğrudan JSX'te. Tekrarlanan pattern'ler obje olarak map ediliyor (`variantClasses`).
- **Import:** Relative path, barrel export yok.
- **Commit:** Conventional commits (`feat:`, `fix:`, `test:`, `chore:`).

## A11y

- Form input'ları `<label>` ile eşleştirildi, hata durumunda `aria-invalid` + `aria-describedby`.
- Modal'da Headless UI Dialog: `aria-modal`, focus trap, ESC kapatma.
- Listbox ile rol seçimi: klavye navigasyonu, screen reader desteği.
- Butonlarda açıklayıcı `aria-label`.
- Toast: `role="status"`, `aria-live="polite"`.
- Boş sonuç durumunda anlamlı geri bildirim.

## Kurulum

```bash
npm install
npm run dev       # localhost:5173
npm test          # vitest
npm run build     # production
```

---

**Süre:** ~5 saat
