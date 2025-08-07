# Running Ninjas - Performance Analysis App

A comprehensive frontend application for analyzing running performance, form, and providing personalized training recommendations using AI-powered analysis.

## 🏃‍♂️ Features

### Core Functionalities

1. **Performance Analysis**
   - Input running stats (age, gender, 5K/10K/Half/Full marathon PBs)
   - VO2 max, threshold pace, and heart rate analysis
   - Benchmarking against global and regional runners
   - Performance scoring and improvement recommendations

2. **Running Form Analysis**
   - Photo/video upload for posture analysis
   - AI-powered gait analysis
   - Foot strike pattern assessment
   - Personalized form improvement recommendations

3. **Complete Analysis**
   - Multi-step form combining performance and form analysis
   - Comprehensive AI-generated reports
   - Personalized training plans
   - Goal-based recommendations

4. **User Profile & Data Management**
   - Save and track analysis history
   - Progress visualization with charts
   - Data export/import functionality
   - Strava integration placeholder

## 📁 Project Structure

```
/workspace/
├── index.html                    # Main landing page with feature overview
├── performance-analysis.html     # Performance data input form
├── performance-results.html      # Performance analysis results
├── form-analysis.html            # Running form upload and analysis form
├── form-results.html             # Form analysis results and recommendations
├── complete-analysis.html        # Multi-step comprehensive analysis
├── profile.html                  # User profile and data management
├── add-runner-form.html          # Original runner registration form
└── README.md                     # This file
```

## 🎨 Design Features

- **Modern UI/UX**: Clean, responsive design with gradient backgrounds
- **Interactive Components**: Step-by-step forms, progress bars, file upload
- **Data Visualization**: Charts and graphs for performance tracking
- **Mobile Responsive**: Optimized for all device sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS via CDN
- **Icons**: Feather Icons
- **Charts**: Chart.js for data visualization
- **Storage**: LocalStorage for client-side data persistence
- **File Handling**: Native HTML5 file APIs for photo/video uploads

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in browser

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start using the application immediately

### Usage Flow

1. **Home Page** (`index.html`)
   - Choose analysis type
   - Navigate to different features

2. **Performance Analysis**
   - Fill in personal information and race times
   - Get comprehensive performance benchmarking
   - Receive personalized training recommendations

3. **Form Analysis**
   - Upload photos/videos of running form
   - Get AI-powered posture and gait analysis
   - Follow improvement recommendations

4. **Complete Analysis**
   - Multi-step process combining all features
   - Most comprehensive analysis option

5. **Profile Management**
   - View analysis history
   - Track progress over time
   - Manage data and preferences

## 💾 Data Storage

The app uses browser LocalStorage to save:
- Analysis results and history
- User preferences and goals
- Uploaded file references
- Strava connection status

Data persists between sessions and can be exported/imported as JSON.

## 🔗 Integration Capabilities

### Strava Integration (Placeholder)
- OAuth connection flow simulation
- Activity sync preparation
- Performance data import ready

### Backend Preparation
The frontend is designed to easily integrate with:
- REST APIs for data processing
- AI/ML services for analysis
- Cloud storage for file uploads
- User authentication systems

## 🎯 AI Analysis Simulation

Currently uses simulated AI responses based on input data:
- Performance scoring algorithms
- Form analysis recommendations
- Training plan generation
- Progress tracking

Ready for integration with actual AI/ML backends.

## 📱 Responsive Design

- **Desktop**: Full-width layouts with multi-column grids
- **Tablet**: Optimized layouts with touch-friendly controls
- **Mobile**: Single-column layouts with simplified navigation

## 🔒 Privacy & Security

- All data stored locally in browser
- No external data transmission (except CDN resources)
- User controls data export/deletion
- File uploads processed client-side

## 🚧 Future Enhancements

1. **Backend Integration**
   - Real AI/ML analysis APIs
   - Cloud data storage
   - User authentication

2. **Advanced Features**
   - Video analysis with computer vision
   - Real-time form feedback
   - Community features and leaderboards

3. **Additional Integrations**
   - Garmin, Fitbit, Apple Health
   - Training plan export to calendars
   - Social sharing capabilities

## 📊 Analytics Features

- Performance trend tracking
- Goal achievement monitoring
- Improvement recommendations
- Comparative analysis with peers

## 🎨 Customization

The app uses CSS custom properties and modular design:
- Easy theme customization
- Configurable color schemes
- Responsive breakpoints
- Component-based architecture

## 🐛 Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

This project is created for demonstration purposes. All running analysis algorithms and recommendations are simulated for frontend demonstration.

## 🤝 Contributing

This is a frontend demonstration project. For production use:
1. Implement real AI/ML backends
2. Add proper user authentication
3. Set up cloud storage for files
4. Implement real Strava API integration

---

**Made with ❤️ for runners by Running Ninjas**