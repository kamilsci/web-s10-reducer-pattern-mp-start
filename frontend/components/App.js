import React , { useReducer }from 'react' // 👈 you'll need the reducer hook
import Quotes from './Quotes'
import QuoteForm from './QuoteForm'

// 👇 these are the types of actions that can change state
const CREATE_QUOTE = 'CREATE_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY' // 👈 toggles the apocryphal property of a single quote
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE'     // 👈 highlights a quote (or un-highlights it)
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'             // 👈 toggles whether to show all or only non-apocryphal

let id = 1
const getNextId = () => id++ // 👈 this is a helper to create new quotes


// 👇 create your initial state object here
const initState = {
  displayallQoutes: true,
  highlightedQoute: null,
  quotes:  [ {
    id: getNextId(),
    quoteText: "Don't cry because it's over, smile because it happened.",
    authorName: "Dr. Seuss",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "So many books, so little time.",
    authorName: "Frank Zappa",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "Be yourself; everyone else is already taken.",
    authorName: "Oscar Wilde",
    apocryphal: false,
  }]
}


const reducer = (state, action) => {
  switch (action.type) {
case CREATE_QUOTE:
  return {
    ...state,
    quotes: [ ...state.qoutes, action.payload ]
  }
case DELETE_QUOTE:
  return {
    ...state,
    quotes: state.quotes.filter(quote => quote.id !== action.payload)
  }
case EDIT_QUOTE_AUTHENTICITY:
  return {
    ...state,
    quotes: state.quotes.map(quote => {
      if (quote.id === action.payload) {
        return {
          ...quote,
          apocryphal: !quote.apocryphal
        }
      }
      return quote
    })}
case SET_HIGHLIGHTED_QUOTE:
  return {
    ...state,
    highlightedQoute: action.payload
  }
case TOGGLE_VISIBILITY:
  return {
    ...state,
    displayallQoutes: !state.displayallQoutes}
  default:
    return state

  }
  // 👇 implement your reducer here using the action types above

}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState )
 
  // 👇 use the reducer hook to spin up state and dispatch

  const createQuote = ({ authorName, quoteText}) => {
    const newquote = {
      id: getNextId(),
      authorName,
      quoteText,
      apocryphal: false
    }
    dispatch({ type: CREATE_QUOTE, payload: newquote })

  }
  const deleteQuote = id => {
    dispatch({ type: DELETE_QUOTE, payload: id })
    // 👇 implement
  }
  const editQuoteAuthenticity = id => {
    dispatch({ type: EDIT_QUOTE_AUTHENTICITY, payload: id })
    // 👇 implement
  }
  const setHighlightedQuote = id => {
    dispatch({ type: SET_HIGHLIGHTED_QUOTE, payload: id })
    // 👇 implement
  }
  const toggleVisibility = () => {
    dispatch({ type: TOGGLE_VISIBILITY })
    // 👇 implement
  }

  return (
    <div id="mp">
      <h2>Module Project</h2>
      <Quotes
        quotes={state.quotes}
        highlightedQuote={state.highlightedQuote}
        deleteQuote={deleteQuote}
        editQuoteAuthenticity={editQuoteAuthenticity}
        setHighlightedQuote={setHighlightedQuote}
        toggleVisibility={toggleVisibility}
      // 👇 lots of props are missing! Check the Quotes component

      />
      <QuoteForm
        createQuote={createQuote}
      />
    </div>
  )
}
