# Portfolio Website

A modern, responsive portfolio website showcasing my work as a full-stack developer and UI/UX designer. Built with clean HTML, CSS, and JavaScript, featuring dynamic project galleries and a contact form.

## 🚀 Live Demo

[View Live Portfolio](https://riguel8.github.io/portfolio/)

## 📋 Features

### Core Sections
- **Home**: Hero section with introduction and navigation
- **About**: Personal information, skills, and background
- **Projects**: Interactive project gallery with image carousels
- **Achievements**: Certifications, awards, and milestones
- **Services**: Offered services and expertise areas
- **Contact**: Functional contact form with email integration

### Interactive Features
- **Project Modal**: Click any project card to view image carousel with navigation
- **Figma Links**: Direct links to design prototypes for UI/UX projects
- **Theme Toggle**: Light/Dark mode support
- **Responsive Design**: Optimized for all device sizes
- **GitHub Contributions**: Dynamic heatmap visualization (public API)

### Contact Integration
- **Web3Forms**: Client-side email sending (no backend required)
- **Form Validation**: Real-time validation with user feedback
- **Toast Notifications**: Success/error messages

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **UI Components**: Preline UI (based on Tailwind)
- **Icons**: Tabler Icons, Iconify
- **Email Service**: Web3Forms API
- **Deployment**: GitHub Pages
- **Version Control**: Git

## 📁 Project Structure

```
portfolio/
├── index.html              # Home page
├── about.html              # About page with contact form
├── projects.html           # Projects showcase
├── achievements.html       # Achievements & certifications
├── services.html           # Services offered
├── assets/
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript files
│   │   ├── project-carousel.js    # Modal carousel logic
│   │   ├── send-email.js          # Contact form handling
│   │   └── github-contributions.js # GitHub contributions chart
│   └── images/             # Project screenshots & assets
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Git (for cloning)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/riguel8/portfolio.git
   cd portfolio
   ```

2. **Open in browser**
   - Open `index.html` in your preferred browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx serve .
     ```

3. **Configure contact form** (optional)
   - Get a free Web3Forms access key from [web3forms.com](https://web3forms.com)
   - Replace `YOUR_ACCESS_KEY_HERE` in `assets/js/send-email.js` with your key

## 🎨 Customization

### Adding Projects
1. Add project images to `assets/images/projects/`
2. Update `projects.html` with new project cards
3. Add project data to `assets/js/project-carousel.js` projectsData object

### Modifying Styles
- Main styles: `assets/css/` directory
- Theme colors: Update CSS custom properties
- Dark mode: Automatic support via data attributes

### Contact Form
- Recipient email: Configured in `assets/js/send-email.js`
- Validation rules: Modify validation functions as needed

## 📧 Contact

Riguel Diaz
- **Email**: rmdiaz1234@gmail.com
- **LinkedIn**: [linkedin.com/in/rigueldi](https://www.linkedin.com/in/rigueldi)
- **GitHub**: [github.com/riguel8](https://github.com/riguel8)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Preline UI**: For beautiful, accessible components
- **Tailwind CSS**: For utility-first styling
- **Web3Forms**: For simple email integration
- **GitHub**: For hosting and version control
