Overview
This project is a web application styled using SCSS (SASS). It utilizes modular SCSS features, including variables, mixins, functions, reusable components, and advanced SCSS techniques to create a well-structured and maintainable stylesheet.

SCSS Features Implemented
1. Variables (`styles/utilities/variables.scss`)
   - Stores color palettes, font sizes, and spacing values for consistency.
   - Example:
     $primary-color: #ff6347;
     $secondary-color: #333;

2. Custom Properties (styles/utilities/_variables.scss)
   - Uses SCSS variables to define CSS custom properties for global usage.

   - Example:
      :root {
      --color-primary: #{$color-primary};
      --font-primary: #{$font-primary};
      }

3. Mixins (`styles/utilities/mixins.scss`)
   - Defines reusable style patterns to reduce repetition.
   - Example:
     @mixin flex-center {
       display: flex;
       justify-content: center;
       align-items: center;
     }
    
4. Functions (`styles/utilities/functions.scss`)
   - Creates dynamic styling logic, such as adjusting color brightness.
   - Example:
     @function darken-color($color, $amount) {
       @return darken($color, $amount);
     }
     
5. Placeholder Selectors (`styles/utilities/placeholders.scss`)
   - Implements reusable styles with `@extend` to avoid duplication.
   - Example:
     %button-style {
       padding: 10px 20px;
       border-radius: 5px;
     }
6. Interpolation (styles/utilities/_utilities.scss)
   - Dynamically generates class names.

   - Example:
      $theme: primary;
      .button-#{$theme} {
      background-color: $color-primary;
      }

7. Conditional Statements (`styles/utilities/_utilities.scss`)
   - Allows conditional styling based on a theme variable.
   - Example:
      @mixin theme-colors($theme) {
         @if $theme == 'light' {
            background-color: white;
            color: black;
         } @else {
            background-color: black;
            color: white;
         }
      }

8. Extend (`styles/utilities/placeholders.scss`)
   - Allows reuse of styles without duplication.
   - Example:
     .card {
       @extend %button-style;
     }

9. Layout-based Styling (`styles/layout/`)
   - `flexbox.scss` and `grid.scss` manage the layout using Flexbox and Grid systems.
   - Example (Flexbox container):
     .container {
       @include flex-center;
       flex-direction: column;
     }

10. Loops (`styles/utilities/_utilities.scss`)
   - Uses `@for` to dynamically generate styles.
   - Example:
   @for $i from 1 through 3 {
      .col-#{$i} {
         width: 100% / $i;
      }
   }

11. Maps (`styles/utilities/_variables.scss`)
- Stores theme colors and retrieves them dynamically.
- Example:
  $theme-colors: (
    primary: #ff6347,
    secondary: #228b22,
  );
  .button-primary {
    background-color: map-get($theme-colors, primary);
  }

12. Parent Selector (`styles/utilities/_utilities.scss`)
- Uses `&` to reference the parent selector and apply hover effects.
- Example:
  .button {
    background-color: $color-primary;
    &:hover {
      background-color: darken($color-primary, 10%);
    }
  }

13. Grid & Flexbox Layouts (`styles/layout/_grid.scss`, `styles/layout/_flexbox.scss`)
- Implements CSS Grid and Flexbox with SCSS.
- Example (Grid Layout):
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-medium;
  }
- Example (Flexbox Layout):
  .flex-container {
    @include flex-center;
    gap: $spacing-medium;
  }

14. Component-based Styling (`styles/components/`)
- Organizes styles for `navbar`, `footer`, `cards`, etc.
- Example:
  .navbar {
    background-color: $color-primary;
    display: flex;
    justify-content: space-between;
  }

Setup and Running Instructions
1. Clone the Repository
   git clone <repository-url>
   cd Assignment_7

2. Compile SCSS to CSS
   use watch mode to automatically compile SCSS changes:
   sass --watch styles/main.scss:styles/main.css

3. Open the Project in a Browser
   - Open `pages/index.html` in your web browser.

Project Structure
Assignment_7/
│── assets/
│   ├── images/
│── pages/
│   ├── index.html
│   ├── about.html
│── styles/
│   ├── main.scss
│   ├── components/
│   ├── layout/
│   ├── utilities/
│── README.md
