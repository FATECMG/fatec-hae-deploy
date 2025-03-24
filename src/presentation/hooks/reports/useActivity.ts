import { Activity } from '@/domain/report/entities/Report'
import { useState } from 'react'

export function useActivity(activity: Activity[]) {
  const [activities, setActivities] = useState(activity)

  function removeActivity(index: number) {
    const newActivities = activities.filter((_, i) => i !== index)
    setActivities(newActivities)
  }

  function addActivity() {
    const newActivities = [
      ...activities,
      { description: '', quantDescriptionResult: `${activities.length + 1}` },
    ]
    setActivities(newActivities)
  }

  return { activities, setActivities, removeActivity, addActivity }
}
