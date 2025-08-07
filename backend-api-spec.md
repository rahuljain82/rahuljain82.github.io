# Runner Analysis App - Backend API Specification

## Overview
This document outlines the backend API endpoints and integration points for the Runner Analysis App. The backend will handle data processing, LLM analysis, and result generation.

## Base URL
```
https://api.runner-analysis.com/v1
```

## Authentication
All API calls require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-api-token>
```

## Endpoints

### 1. Submit Runner Analysis

**POST** `/analysis/submit`

Submit runner performance data for analysis.

**Request Body:**
```json
{
  "personal_info": {
    "age": 28,
    "gender": "male"
  },
  "performance_data": {
    "pb_5k": "20:30",
    "pb_10k": "42:15", 
    "pb_half_marathon": "1:35:20",
    "pb_full_marathon": "3:15:45",
    "vo2_max": 55.2,
    "threshold_pace": "4:15",
    "threshold_heart_rate": 165,
    "weekly_mileage": 45.5
  },
  "photos": {
    "foot_landing": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
    "running_posture": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
  },
  "strava_data": {
    "connected": true,
    "recent_activities": [
      {
        "type": "Run",
        "distance": 10.5,
        "duration": 2700,
        "average_pace": "4:17",
        "date": "2024-01-15"
      }
    ]
  }
}
```

**Response:**
```json
{
  "analysis_id": "analysis_123456",
  "status": "processing",
  "estimated_completion": "2024-01-15T10:30:00Z"
}
```

### 2. Get Analysis Results

**GET** `/analysis/{analysis_id}/results`

Retrieve completed analysis results.

**Response:**
```json
{
  "analysis_id": "analysis_123456",
  "status": "completed",
  "completed_at": "2024-01-15T10:25:00Z",
  "results": {
    "fitness_benchmark": {
      "global_percentile": 85,
      "regional_percentile": 78,
      "age_group_percentile": 82,
      "description": "Your performance places you in the top 15% of global runners...",
      "comparison_data": {
        "global_runners": 1500000,
        "regional_runners": 50000,
        "age_group_runners": 25000
      }
    },
    "performance_analysis": {
      "strengths": [
        "Excellent aerobic capacity",
        "Strong threshold pace",
        "Good recovery ability"
      ],
      "weaknesses": [
        "Limited speed work",
        "Could improve running economy"
      ],
      "radar_chart_data": {
        "labels": ["5K Speed", "10K Endurance", "Half Marathon", "VO2 Max", "Threshold Pace", "Recovery"],
        "values": [85, 78, 72, 80, 75, 70]
      }
    },
    "training_plan": {
      "duration_weeks": 8,
      "phases": [
        {
          "name": "Base Building",
          "duration": "Weeks 1-4",
          "focus": "Aerobic development",
          "workouts": [
            {
              "type": "Easy Run",
              "frequency": "3-4 per week",
              "duration": "30-45 minutes",
              "intensity": "60-70% max HR"
            },
            {
              "type": "Long Run",
              "frequency": "1 per week", 
              "duration": "60-90 minutes",
              "intensity": "65-75% max HR"
            }
          ]
        },
        {
          "name": "Speed Development",
          "duration": "Weeks 5-8",
          "focus": "Lactate threshold and VO2 max",
          "workouts": [
            {
              "type": "Tempo Run",
              "frequency": "1 per week",
              "duration": "20-30 minutes",
              "intensity": "85-90% max HR"
            },
            {
              "type": "Interval Training",
              "frequency": "1 per week",
              "duration": "6-8 x 800m",
              "intensity": "95-100% max HR"
            }
          ]
        }
      ],
      "target_improvements": {
        "5k_time": "2-3 minutes faster",
        "10k_time": "4-5 minutes faster",
        "half_marathon": "5-7 minutes faster"
      }
    },
    "posture_analysis": {
      "foot_landing": {
        "strike_pattern": "midfoot",
        "efficiency_score": 8.5,
        "recommendations": [
          "Good foot strike pattern",
          "Consider shorter, quicker strides"
        ]
      },
      "running_posture": {
        "forward_lean": "5-7 degrees (optimal)",
        "arm_swing": "Proper mechanics",
        "cadence": "170-180 spm",
        "issues_detected": [
          "Slight overstriding",
          "Could improve hip extension"
        ],
        "recommendations": [
          "Focus on shorter, quicker strides",
          "Incorporate hip mobility drills",
          "Work on core strength"
        ]
      }
    }
  }
}
```

### 3. Check Analysis Status

**GET** `/analysis/{analysis_id}/status`

Check the processing status of an analysis.

**Response:**
```json
{
  "analysis_id": "analysis_123456",
  "status": "processing",
  "progress": 65,
  "current_step": "Generating training plan",
  "estimated_completion": "2024-01-15T10:30:00Z"
}
```

### 4. Save Analysis to Profile

**POST** `/profile/analysis/save`

Save analysis results to user profile.

**Request Body:**
```json
{
  "analysis_id": "analysis_123456",
  "name": "January 2024 Analysis",
  "notes": "Pre-spring training assessment"
}
```

**Response:**
```json
{
  "saved": true,
  "profile_id": "profile_789",
  "saved_at": "2024-01-15T10:35:00Z"
}
```

### 5. Get Analysis History

**GET** `/profile/analysis/history`

Retrieve user's analysis history.

**Response:**
```json
{
  "analyses": [
    {
      "analysis_id": "analysis_123456",
      "name": "January 2024 Analysis",
      "created_at": "2024-01-15T10:00:00Z",
      "status": "completed",
      "summary": {
        "global_percentile": 85,
        "key_improvement": "5K time by 2-3 minutes"
      }
    },
    {
      "analysis_id": "analysis_123455",
      "name": "December 2023 Analysis", 
      "created_at": "2023-12-15T10:00:00Z",
      "status": "completed",
      "summary": {
        "global_percentile": 82,
        "key_improvement": "10K time by 4-5 minutes"
      }
    }
  ]
}
```

### 6. Strava Integration

**POST** `/strava/connect`

Initiate Strava OAuth connection.

**Response:**
```json
{
  "auth_url": "https://www.strava.com/oauth/authorize?client_id=...",
  "state": "random_state_string"
}
```

**GET** `/strava/callback`

Handle Strava OAuth callback.

**GET** `/strava/activities`

Get user's Strava activities.

**Response:**
```json
{
  "activities": [
    {
      "id": 123456789,
      "type": "Run",
      "name": "Morning Run",
      "distance": 10.5,
      "moving_time": 2700,
      "elapsed_time": 2800,
      "total_elevation_gain": 150,
      "start_date": "2024-01-15T06:00:00Z",
      "average_speed": 3.89,
      "max_speed": 4.5,
      "average_heartrate": 145,
      "max_heartrate": 175
    }
  ]
}
```

## LLM Integration

### Prompt Generation
The backend will generate comprehensive prompts for LLM analysis:

```python
def generate_analysis_prompt(runner_data):
    prompt = f"""
    Analyze the following runner's performance data and provide comprehensive insights:
    
    Personal Information:
    - Age: {runner_data['age']}
    - Gender: {runner_data['gender']}
    
    Performance Data:
    - 5K PB: {runner_data['pb_5k']}
    - 10K PB: {runner_data['pb_10k']}
    - Half Marathon PB: {runner_data['pb_half_marathon']}
    - Full Marathon PB: {runner_data['pb_full_marathon']}
    - VO2 Max: {runner_data['vo2_max']} ml/kg/min
    - Threshold Pace: {runner_data['threshold_pace']} min/km
    - Threshold Heart Rate: {runner_data['threshold_heart_rate']} bpm
    - Weekly Mileage: {runner_data['weekly_mileage']} km
    
    Please provide:
    1. Fitness level benchmarking against global, regional, and age-group runners
    2. Detailed performance analysis with strengths and weaknesses
    3. Personalized 8-week training plan with specific workouts
    4. Running form analysis based on uploaded photos
    5. Specific improvement targets and recommendations
    
    Format the response as structured JSON with the following sections:
    - fitness_benchmark
    - performance_analysis  
    - training_plan
    - posture_analysis
    """
    return prompt
```

### LLM Models Used
- **Primary Analysis**: GPT-4 or Claude-3 for comprehensive performance analysis
- **Image Analysis**: Vision-capable models (GPT-4V, Claude-3 Vision) for posture analysis
- **Training Plan**: Specialized running coaching models
- **Benchmarking**: Models trained on global running performance data

### Iterative Analysis Process
1. **Initial Analysis**: Generate base performance assessment
2. **Photo Analysis**: Analyze uploaded running form photos
3. **Training Plan Generation**: Create personalized training program
4. **Benchmarking**: Compare against global/regional databases
5. **Final Integration**: Combine all analyses into comprehensive report

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "validation_error",
  "message": "Invalid performance data format",
  "details": {
    "field": "pb_5k",
    "issue": "Time format should be mm:ss"
  }
}
```

**401 Unauthorized:**
```json
{
  "error": "authentication_error", 
  "message": "Invalid or expired API token"
}
```

**429 Rate Limited:**
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests",
  "retry_after": 60
}
```

**500 Internal Server Error:**
```json
{
  "error": "internal_error",
  "message": "Analysis processing failed",
  "analysis_id": "analysis_123456"
}
```

## Rate Limits
- **Analysis Submissions**: 5 per hour per user
- **Status Checks**: 60 per minute per user
- **History Retrieval**: 100 per hour per user

## Data Privacy
- All personal data encrypted at rest and in transit
- Photos processed securely and deleted after analysis
- Strava data handled according to Strava API terms
- User consent required for data processing

## Implementation Notes

### Frontend Integration
The frontend will:
1. Collect all required data from the form
2. Upload photos and convert to base64
3. Submit data to `/analysis/submit`
4. Poll `/analysis/{id}/status` for progress
5. Retrieve results from `/analysis/{id}/results`
6. Save to profile using `/profile/analysis/save`

### Backend Processing
The backend will:
1. Validate and sanitize input data
2. Generate comprehensive LLM prompts
3. Process photos through vision models
4. Run iterative analysis with multiple LLM calls
5. Generate benchmarking data
6. Create structured training plans
7. Return comprehensive results

This API specification provides a complete framework for the Runner Analysis App backend, enabling sophisticated LLM-powered analysis while maintaining security, performance, and user experience.