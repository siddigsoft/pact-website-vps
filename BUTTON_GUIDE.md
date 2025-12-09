# 🎨 Quick Visual Reference - Button Styles

## All Button Variants Now Available

Copy-paste these examples into your admin pages:

### 1. Primary Button (Most Common)
```tsx
<Button>Save Changes</Button>
<Button>Add New</Button>
<Button>Create Service</Button>
```
**Appearance:** Navy blue background (#1A3A5F), white text, shadow

---

### 2. Secondary Button (Alternative Actions)
```tsx
<Button variant="secondary">Preview</Button>
<Button variant="secondary">Export</Button>
```
**Appearance:** Orange background (#E96D1F), white text

---

### 3. Outline Button (Cancel/Back)
```tsx
<Button variant="outline">Cancel</Button>
<Button variant="outline">Go Back</Button>
```
**Appearance:** White background, navy border, fills on hover

---

### 4. Destructive Button (Delete/Remove)
```tsx
<Button variant="destructive">Delete</Button>
<Button variant="destructive">Remove</Button>
```
**Appearance:** Red background, white text, clear warning

---

### 5. Ghost Button (Subtle Actions)
```tsx
<Button variant="ghost">View Details</Button>
<Button variant="ghost">Edit</Button>
```
**Appearance:** Transparent, light gray on hover

---

### 6. Size Variants

```tsx
{/* Small */}
<Button size="sm">Small Action</Button>

{/* Default */}
<Button>Normal Action</Button>

{/* Large */}
<Button size="lg">Large Action</Button>

{/* Icon Only */}
<Button size="icon"><Edit className="h-4 w-4" /></Button>
```

---

## Common Button Combinations

### Action Row with Multiple Buttons
```tsx
<div className="flex gap-2">
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</div>
```

### Edit and Delete Actions
```tsx
<div className="flex gap-2">
  <Button variant="ghost" size="sm">
    <Edit className="h-4 w-4 mr-1" />
    Edit
  </Button>
  <Button variant="destructive" size="sm">
    <Trash className="h-4 w-4 mr-1" />
    Delete
  </Button>
</div>
```

### Loading State
```tsx
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

---

## Form Buttons

### Submit Form
```tsx
<Button type="submit" className="w-full">
  Submit
</Button>
```

### Reset Form
```tsx
<Button type="button" variant="outline" onClick={() => form.reset()}>
  Reset
</Button>
```

---

## Color Reference

| Button Type | Background | Text | Border | Hover |
|-------------|------------|------|--------|-------|
| Default | #1A3A5F (Navy) | White | #1A3A5F | #142E4C |
| Secondary | #E96D1F (Orange) | White | #E96D1F | #D35E16 |
| Outline | White | #1A3A5F | #1A3A5F | #1A3A5F bg |
| Destructive | #ef4444 (Red) | White | #ef4444 | #dc2626 |
| Ghost | Transparent | Gray | None | #f3f4f6 |

---

## Accessibility Features

All buttons now include:
- ✅ Keyboard focus rings (blue outline)
- ✅ Hover states (visual feedback)
- ✅ Disabled states (reduced opacity)
- ✅ Screen reader support
- ✅ Touch-friendly sizing (minimum 44x44px)

---

## Quick Test

Visit: http://localhost:5000/admin/services

You should see:
- ✅ Bold "Add New Service" button (navy blue)
- ✅ Edit buttons (ghost/outline)
- ✅ Delete buttons (red)
- ✅ All buttons with shadows and hover effects
