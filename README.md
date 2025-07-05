# Library Management System with Vite + RTK Query Redux

Library Management System with redux হচ্ছে একটি সিম্পল, কার্যকরী ওয়েব অ্যাপ্লিকেশন যেখানে কোন ইউজার:

* All Book list দেখতে পারে, Navigation থেকে All Books route এ 

* CRUD (Create, Read, Update, Delete) অপারেশন করতে পারে, যেমনঃ কোন সিংগেল বই ডাটা Single book page (action থেকে view button এ ক্লিক করে), ডিলিট, এডিট করা। (গ্রিড বা টেবিল actions থেকে)

* বই ধার করতে পারে (Borrow)। Action থেকে বা বই ডিটেইলস পেজ থেকে Borrow this book Button এ ক্লিক করে। 

* ধার করা বইয়ের সংক্ষিপ্ত Summery (Borrow Summary) দেখতে পারে। (Navbar থেকে Borrow Summery Route এ)

কোনো লগইন/অথরাইজেশন নেই, পেমেন্ট বা ক্যাটাগরি ফিল্টার নেই—শুধুমাত্র মৌলিক লাইব্রেরি ম্যানেজমেন্ট ফিচার গুলোই দেখানো হয়েছে।


## Main Features

### 1. Public Route

    সবগুলো পেজ Open কোন লগইন ছাড়াই Accessible।
### 2. Book Management

  * List: /books-এ টেবিল বা গ্রিডে সব বই Show করানো হইছে

  * Create: /create-book পেজ থেকে নতুন বই add করানো যায়

  * Edit: /edit-book/:id-এ  বইয়ের তথ্য পরিবর্তন বা এডিট করা যায় 

  * Delete: Button দিয়ে বই ডিলিট করা যায়

  * Business Logic:

    * কপি যদি 0 হয় → বই “Unavailable” mark

    * Zod ও Mongoose দিয়ে  ভ্যালিডেশন করা 
### 3. Borrow Book

   * Form: /borrow/:bookId-এ Quantity ও Due Date সিলেক্ট করে কোন বই ধার নেওয়া যায়

  * Business logic:

      * Quantity ≤ Available Copies

      * Borrow করলে Copies কমে যায়; যদি 0 হয় → Unavailable
        
      * Unavailable থাকলে Borrow button disable থাকে 

  * Edit: /edit-book/:id-এ  বইয়ের তথ্য পরিবর্তন বা এডিট করা যায় 

  * Delete: Button দিয়ে বই ডিলিট করা যায়

  * Business Logic:

    * কপি যদি 0 হয় → বই “Unavailable” mark

    * Zod ও Mongoose দিয়ে  ভ্যালিডেশন করা

      
### 4. Borrow Summary

   * Aggregation API দিয়ে /borrow-summary-এ সকল Borrowed Book show করা
     
   * কলাম: Title, ISBN, Total Quantity Borrowed

     
### 5. UI Components

   * Navbar: All Books, Add Book, Borrow Summary, Redux Folder, Zod Schemas, Types etc
     
   * Responsive ডিজাইন (Tailwind CSS)

   * Footer: Project Info, টেক স্ট্যাক ইত্যাদি


 # 🛠️ ইন্সটলেশন ও রান

 ```
git clone https://github.com/HamzaAryanSapnil/library-management-with-redux
```
 ```
npm i
npm run dev
```

### Environment Variables

 ```
PORT=5000
DB_URL=<আপনার MongoDB URI>
NODE_ENV=development

```


# 📦 API এন্ডপয়েন্টসমূহ

| অপারেশন     | পাথ                     | বর্ণনা                                           |
| ----------- | ----------------------- | ------------------------------------------------ |
| Create      | `POST /api/books`       | নতুন বই যোগ (title, author, genre, isbn, copies) |
| Read All    | `GET /api/books`        | সব বইয়ের তালিকা (filter, sort, pagination)       |
| Read Single | `GET /api/books/:id`    | একক বইয়ের ডিটেইল                                 |
| Update      | `PUT /api/books/:id`    | বইয়ের তথ্য আপডেট                                 |
| Delete      | `DELETE /api/books/:id` | বই মুছে ফেলা                                     |


| অপারেশন | পাথ                | বর্ণনা                                                         |
| ------- | ------------------ | -------------------------------------------------------------- |
| Borrow  | `POST /api/borrow` | বই ধার (bookId, quantity, dueDate)                             |
| Summary | `GET /api/borrow`  | ধার করা বইয়ের সারাংশ (Aggregation: title, isbn, totalQuantity) |


# 💻 ফ্রন্টএন্ড টেকস্টাক

* React + TypeScript

* Redux Toolkit + RTK Query

* Tailwind CSS (shadcn/ui)

* React Router v6

* Zod + react-hook-form (Type-safe ফর্ম)

* sonner Toast Notifications

* Responsive ডিজাইন

# 🏁 Conclusion
এখন আপনার কাছে একটি সম্পূর্ণ, মডুলার লাইব্রেরি ম্যানেজমেন্ট সিস্টেম আছে—ব্যাকএন্ড ও ফ্রন্টএন্ড উভয়ই টাইপ-সেফ, পরিষ্কার কোড, এবং ব্যবহার-বান্ধব UI সহ।
Happy Coding 🎉



## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
