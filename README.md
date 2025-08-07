# Runner Analysis App

A comprehensive web application that provides AI-powered running performance analysis, personalized training plans, and running form assessment.

## 🏃‍♂️ Features

### Core Functionality
- **Performance Data Input**: Collect comprehensive runner data including age, gender, personal bests, VO2 max, threshold metrics
- **Photo Upload & Analysis**: Upload running form photos for posture and foot strike analysis
- **AI-Powered Analysis**: Uses multiple LLM models for comprehensive performance assessment
- **Global Benchmarking**: Compare performance against global, regional, and age-group runners
- **Personalized Training Plans**: Generate 8-week customized training programs
- **Profile Management**: Save and track analysis history
- **Strava Integration**: Connect with Strava for automatic activity import

### Analysis Components
1. **Fitness Level Benchmarking**
   - Global runner percentile ranking
   - Regional performance comparison
   - Age-group specific analysis
   - Detailed performance insights

2. **Performance Analysis**
   - Radar chart visualization of key metrics
   - Strengths and weaknesses identification
   - Improvement potential assessment
   - Recovery and training load analysis

3. **Training Plan Generation**
   - 8-week structured training program
   - Phase-based progression (Base Building → Speed Development)
   - Specific workout recommendations
   - Target improvement predictions

4. **Running Form Analysis**
   - Foot landing pattern analysis
   - Posture and biomechanics assessment
   - Form improvement recommendations
   - Injury prevention suggestions

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for LLM analysis
- Strava account (optional, for activity import)

### Installation
1. Clone or download the repository
2. Open `runner-analysis-app.html` in your web browser
3. Start using the application immediately

### Usage

#### 1. Input Your Data
- Fill in personal information (age, gender)
- Enter your personal best times for different distances
- Add physiological data (VO2 max, threshold pace, heart rate)
- Upload photos of your running form (optional but recommended)

#### 2. Connect Strava (Optional)
- Click "Connect Strava Account" to import recent activities
- This provides additional context for analysis

#### 3. Submit for Analysis
- Click "Analyze Performance" to start the AI analysis
- The system will process your data through multiple LLM models
- Analysis typically takes 2-3 minutes

#### 4. Review Results
- **Fitness Benchmark**: See how you rank globally and regionally
- **Performance Chart**: Visual radar chart of your key metrics
- **Training Plan**: Personalized 8-week training program
- **Form Analysis**: Detailed posture and biomechanics feedback

#### 5. Save and Track
- Save results to your profile for future reference
- Export reports as PDF
- Track progress over time through analysis history

## 🏗️ Technical Architecture

### Frontend
- **Framework**: Vanilla HTML/CSS/JavaScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Charts**: Chart.js for data visualization
- **Icons**: Feather Icons for clean, consistent iconography

### Backend Integration
- **API**: RESTful API for data processing and analysis
- **LLM Models**: Multiple AI models for different analysis types
- **Image Processing**: Vision-capable models for form analysis
- **Data Storage**: Secure user profile and analysis history

### Key Technologies
```html
<!-- Core Dependencies -->
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/feather-icons"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

## 📊 Data Input Fields

### Personal Information
- **Age**: Your current age (10-100)
- **Gender**: Male, Female, or Other

### Performance Data
- **5K PB**: Personal best 5K time (mm:ss format)
- **10K PB**: Personal best 10K time (mm:ss format)
- **Half Marathon PB**: Personal best half marathon time (hh:mm:ss format)
- **Full Marathon PB**: Personal best marathon time (hh:mm:ss format)
- **VO2 Max**: Maximum oxygen consumption (ml/kg/min)
- **Threshold Pace**: Lactate threshold pace (min/km format)
- **Threshold Heart Rate**: Lactate threshold heart rate (bpm)
- **Weekly Mileage**: Current weekly running distance (km)

### Photo Uploads
- **Foot Landing**: Photo showing your foot strike pattern
- **Running Posture**: Photo showing your overall running form

## 🔍 Analysis Process

### 1. Data Validation
- Input validation and sanitization
- Format checking for time entries
- Photo format and size validation

### 2. LLM Processing
- **Primary Analysis**: Comprehensive performance assessment
- **Image Analysis**: Vision model analysis of running form
- **Training Generation**: Specialized coaching model
- **Benchmarking**: Comparison against global databases

### 3. Result Generation
- Structured JSON response with all analysis components
- Visual charts and graphs
- Actionable recommendations
- Progress tracking metrics

## 🎯 Sample Results

### Fitness Benchmark
```
Global Runners: 85th percentile
Regional Runners: 78th percentile  
Age Group: 82nd percentile

Your performance places you in the top 15% of global runners
and top 22% of regional runners in your age group.
```

### Training Plan Example
```
Week 1-4: Base Building
• 3-4 easy runs per week (30-45 min)
• 1 long run (60-90 min)
• Focus on building aerobic base
• Include 2-3 strength sessions

Week 5-8: Speed Development
• Add 1 tempo run per week
• Include interval training
• Maintain long runs (90-120 min)
• Continue strength training
```

### Form Analysis Example
```
Strengths:
• Good forward lean (5-7 degrees)
• Proper arm swing mechanics
• Consistent cadence (170-180 spm)

Areas for Improvement:
• Slight overstriding detected
• Could improve hip extension
• Consider increasing stride frequency
```

## 🔐 Privacy & Security

### Data Protection
- All personal data encrypted at rest and in transit
- Photos processed securely and deleted after analysis
- No data shared with third parties without consent
- User control over data retention

### Strava Integration
- OAuth 2.0 secure authentication
- Read-only access to activity data
- User can revoke access at any time
- Data handled according to Strava API terms

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Future Enhancements

### Planned Features
- **Real-time Analysis**: Live performance tracking
- **Advanced Metrics**: More detailed physiological data
- **Social Features**: Share results with running groups
- **Mobile App**: Native iOS and Android applications
- **Coach Integration**: Connect with running coaches
- **Race Prediction**: AI-powered race time predictions

### Technical Improvements
- **Offline Support**: Work without internet connection
- **Progressive Web App**: Install as native app
- **Advanced Analytics**: More detailed performance insights
- **Integration APIs**: Connect with more fitness platforms

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Follow existing HTML/CSS/JavaScript conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design principles

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Getting Help
- Check the FAQ section below
- Review the API documentation
- Contact support for technical issues

### Common Issues
- **Photos not uploading**: Ensure file is under 10MB and in JPG/PNG format
- **Analysis taking long**: Normal processing time is 2-3 minutes
- **Strava connection issues**: Check your Strava account permissions

## 📞 Contact

For questions, feedback, or support:
- Email: support@runner-analysis.com
- GitHub Issues: Report bugs or feature requests
- Documentation: Full API and usage documentation

---

**Built with ❤️ for runners everywhere**

*The Runner Analysis App helps runners of all levels understand their performance, improve their form, and achieve their goals through AI-powered insights and personalized training plans.*