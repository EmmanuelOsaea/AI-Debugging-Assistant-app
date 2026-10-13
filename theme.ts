plugin "daisyui/theme" {
  name: "Bread and Pear"; /* Custom name is present */
  default: true;        /* Set to true */
  prefersdark: false;
  color-scheme: "light";

  /* 2. Base/Background Colors */
  --color-base-100: oklch(96.2% 0.015 84);      
  --color-base-200: oklch(88.5% 0.045 84);       
  --color-base-300: oklch(81.2% 0.044 83.1);       
  --color-base-content: oklch(58.6% 0.041 82);   


  /* 3. Primary & Accent Colors */
  --color-primary: oklch(96.1% 0.115 110);        
  --color-primary-content: oklch(91.7% 0.175 110);
  --color-secondary: oklch(59.8% 0.116 122.1);
  --color-secondary-content: oklch(85.4% 0.198 108.5);
  --color-accent: oklch(72.5% 0.182 110); 
  --color-accent-content: oklch(55.2% 0.151 112);

/* 4. Functional UI Feedback Colors */
color-info: oklch (0.85 0.00 0.0);
  --color-info-content: oklch(0.77 0.01 154.9);
  --color-success: oklch(64% 0.22 142);      
  --color-success-content: oklch(44% 0.16 142);
  --color-warning: oklch(88% 0.20 100);
  --color-warning-content: oklch(68% 0.16 95);
  --color-error: oklch(60% 0.26 25);          
  --color-error-content: oklch(40% 0.20 25);

  /* 5. UI Elements Customization (Optional) */
  --radius-selector: 0.75rem;                 /* Makes checkboxes/radios softer */
  --radius-field: 0.5rem;                     /* Input field roundness */
  --radius-box: 1rem;                         /* Prompt card roundness */
  --border: 1px;
}
