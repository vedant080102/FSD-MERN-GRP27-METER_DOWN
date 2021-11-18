// server.autosuggest.js
import React from 'react';
import Autosuggest from 'react-autosuggest';

class ServerAutoSuggest extends React.Component {
    constructor() {
        super();

        //Define state for value and suggestion collection
        this.state = {
            value: '',
            suggestions: []
        };
    }

    // Filter logic
    getSuggestions = async (value) => {
        const inputValue = value.trim().toLowerCase();
        let response = await fetch("http://www.omdbapi.com/?s=" + inputValue + "&apikey=a591bb53");
        let data = await response.json()
        return data;
    };

    // Trigger suggestions
    getSuggestionValue = suggestion => suggestion.Title;

    // Render Each Option
    renderSuggestion = suggestion => (
        <span className="sugg-option">
            <span className="icon-wrap"><img src={suggestion.Poster} /></span>
            <span className="name">
                {suggestion.Title}
            </span>
        </span>
    );

    // OnChange event handler
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Suggestion rerender when user types
    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
            .then(data => {
                if (data.Error) {
                    this.setState({
                        suggestions: []
                    });
                } else {
                    this.setState({
                        suggestions: data.Search
                    });
                }
            })
    };

    // Triggered on clear
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;

        // Option props
        const inputProps = {
            placeholder: 'Type movie name',
            value,
            onChange: this.onChange
        };

        // Adding AutoSuggest component
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default ServerAutoSuggest;