import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../../components/Header/Header";
import { tokens } from "../../../theme";
import { red } from "@mui/material/colors";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  /*
    بيناديها أوتوماتيك لما المستخدم FullCalendar ال function  عبارة عن 
    يضغط على يوم / أيام

    selected => كبير فى كل تفاصيل الإختيار object عبارة عن

    * selected أى هى الحاجات الى موجودة فى ال
      - selected.startStr   // تاريخ البداية كنص
      - selected.endStr     // تاريخ النهاية كنص
      - selected.allDay     // هل الحدث طول اليوم؟
      - selected.view       // الـ view الحالية (Month / Week)

  */
  const handleDateClick = (selected) => {
    // هنا بنطلب من اليوز إنة يدخل العنوان الخاص بى
    const title = prompt("Please enter a new title for your event");
    /*
      *  calendar تتحكم بية فى ال API بيديك FullCalendar هنا ال

      *  المتاحة Events أمثلة على ال
        addEvent
        remove
        getEvents
        changeView
        ---------------------------
        يعني من غير السطر ده → مش هتعرف تضيف حدث
    */
    const calendarApi = selected.view.calendar;
    // unselect() =>  (ودا يعتبر م أحسن حاجه خالص من ناحية الشكل ) لو مافكيناش التحديد دا هيفضل متظلل range تستخدم لإلغاء التحديد علشان لو كا اليوز محدد يوم أو
    calendarApi.unselect();
    /*
      cancel  فاضى أو ضغط title ولا لا علشان لو اليوز ساب ال title هل فى check هنا بنعمل
      من غير الشرط دا الإيفنت هيتضاف فاضى 
    */
    if (title) {
      /*
        * Event تفاصيل ال
          - id => علشان نقدر نحذفة ونميزة عن غيرة Unique لازم يكون
          - title => اسم الحدث اللي المستخدم كتبه
          - start => (كنص) تاريخ البداية 
          - end => (مهم لو المستخدم سحب أكتر من يوم) تاريخ النهاية 
          - allDay => ✔ لو حدث يوم كامل
      */
      calendarApi.addEvent({
        id : `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      })
    }
  };

  const handleEventClick = (selected) =>{
    if(window.confirm(`Are You Sure You Want To Delete The Event ${selected.event.title}`)){
      selected.event.remove()
    }
  }


  return (
    <Box mt="25px" p={'0 1.5rem'}>
      <Header title="Calendar" subTitle="Full Calendar Interactive Page" />

      <Box display={"flex"} justifyContent={"space-between"} flexDirection={{ xs:"column" , sm:"column" , md:"row" }}>
        {/* Calendar SideBar */}
        <Box flex={'1 1 20%'} bgcolor={colors.primary[400]} p={"15px"} borderRadius={"4px"} mb={{ xs:"20px" , sm:"25px" }} mt={'25px'}>
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event)=>{
              return <ListItem key={event.id} sx={{ backgroundColor:colors.greenAccent[500] , margin:"10px 0" , borderRadius:"2px" }}>
                <ListItemText primary={event.title} secondary={
                  <Typography>
                    {/* formatDate => إلى نص مقروء Date Object تقوم بتحويل ال */}
                    {formatDate(event.start,{
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                }>
                </ListItemText>
              </ListItem>
            })}
          </List>
        </Box>
        {/* Calendar */}
        <Box flex={'1 1 100%'} ml={{ xs:"0px" , sm:"0px" , md:"15px" }}>
          <FullCalendar
            height={"75vh"}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin
            ]}
            headerToolbar = {{ 
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events)=>setCurrentEvents(events)}
            initialEvents={[
              {id:"1234" ,title: "All-Day-Events" , date: "2026-02-07"},
              {id:"4321" ,title: "Timed Event" , date: "2026-02-08"},
            ]}
          />
        </Box>
      </Box>

    </Box>
  );
};

export default Calendar;