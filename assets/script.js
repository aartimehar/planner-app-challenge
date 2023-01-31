function updateCurrentDay () {
  const currentTime = moment().format('dddd, MMMM Do YYYY, h:mm:ss a')

  // Get html element with id currentDay
  const currentTimeElement = $('#currentDay')

  // Update text of currentDay element
  currentTimeElement.text(currentTime)
}

// short hand
// const updateCurrentDay = () => $('#currentDay').text(moment().format())

updateCurrentDay()

function addTimeBlocks () {
  let timeblockContainer = $('.container')
  let currentHour = moment().hour()

  // Add 24 blocks, for each hour of the day
  for (let hour = 0; hour < 24; hour++) {
    let bgColor = 'bg-secondary'

    if (hour === currentHour) {
      bgColor = 'bg-danger'
    } else if (hour > currentHour) {
      bgColor = 'bg-success'
    }

    // Get value stored in local storage for this hour slot
    let previousValue = localStorage.getItem(hour)

    if (!previousValue) previousValue = ''

    timeblockContainer.append(
      `<div class="row row-cols-3 border">
        <div class="col-2 border-right">
            ${hour}:00
        </div>
        <textarea id=${
          'ta' + hour
        } class="form-control text-light col-8 border-right ${bgColor}">${previousValue}</textarea>
        <div class="col-2">
            <button class="btn btn-primary" type="submit" onClick='onEventSave(${hour})'>Save
            <i class="fas fa-save width="100" height="100""></i>
            </button>
        </div>
    </div>`
    )
  }
}

function onEventSave (hour) {
  // Get the text entered at event box for this hour
  let textAreaElement = $(`#ta${hour}`)

  let userInput = textAreaElement.val()

  // Save text in local storage
  localStorage.setItem(hour, userInput)

  alert(`Successfully saved event: ${userInput} for timeslot: ${hour}:00`)
}

addTimeBlocks()
