Below is a clear, practical recommendation tailored for **ZetuMarket’s structure**, which uses:

* Multiple apps (`web-seller`, `web-buyer`, `admin`)
* Multiple backend auth flows (`auth-service`)
* Different user roles (Seller, Buyer, Admin)
* Different UI/UX requirements

---

# ✅ **SHORT ANSWER:**

**Every user type should have its *own authentication pages*, not shared.**

---

# ✅ **WHY THEY SHOULD BE DIFFERENT**

Here’s the breakdown:

---

# **1. Different UX and branding**

Each user type has a different journey:

### **Buyer**

* Fast login
* Mobile-first
* Google/Phone login
* No documents needed

### **Seller**

* Business onboarding
* Terms must be accepted
* Document upload
* Legal compliance
* Risk & fraud checks

### **Admin**

* Very secure
* 2FA required
* No signup, only assigned accounts
* Audit logs

**These flows are not similar, so a shared login/register would cause UX conflicts.**

---

# **2. Different security levels**

Admins require:

* IP restrictions (optional)
* 2FA
* Strong passwords
* No public “Sign Up”

Sellers require:

* Document verification
* Traceability

Buyers require:

* Simplicity

**Mixing these together reduces security and increases risk.**

---

# **3. Your monorepo already separates apps**

Your structure proves this:

```
apps/
   web-seller/
   web-buyer/
   admin/
services/
   auth-service/
```

Each app should render its *own* login UI, but all should call the **same auth-service** backend.

---

# **4. Easier permissions**

After login:

* Buyers go to: buyer dashboard/home
* Sellers go to: seller dashboard
* Admins go to: admin dashboard

Different login pages prevent misrouting and role confusion.

---

# **5. You avoid huge spaghetti logic**

If you combine:

* `/login?role=seller`
* `/login?role=buyer`
* `/login?role=admin`

Then you must manage:

* Conditional forms
* Conditional redirects
* Conditional UI
* Conditional validation
* Conditional cookies

This becomes messy very fast.

---

# ✅ BEST ARCHITECTURE (Recommended)

## **1. Buyer Pages**

```
/login
/register
/forgot-password
```

## **2. Seller Pages**

```
/auth/login
/auth/register
/auth/forgot-password
/onboarding/...
```

## **3. Admin Pages**

```
/admin/login
/admin/2fa
```

---

# 🚀 **BACKEND HANDLING (auth-service)**

Even if UI pages are separate, **authentication logic is centralized**:

### Endpoint example:

```
POST /auth/login
{
   email,
   password,
   role: "seller" | "buyer" | "admin"
}
```

**The backend enforces:**

* Admin cannot log in on seller portal
* Buyer cannot log in on admin portal
* Seller cannot log in on buyer portal

---

# 📌 Final Recommendation

### **DO NOT share authentication pages.**

### **DO share the backend authentication logic.**

This gives you:

✔ Clean UI
✔ Clean code
✔ Strong security
✔ Better UX
✔ Role-safe routing

---

If you want, I can now generate:

### ✅ A full authentication system architecture diagram

### ✅ The Next.js file structure for all 3 login systems

### ✅ The exact UI for each login page (shadcn + Tailwind)

### ✅ API endpoints for auth-service

Which one should I generate next?
