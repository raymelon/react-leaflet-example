import { connect } from "react-redux";
import { setSearchVisibility } from "../../store/actions";
import { IState } from "../../store/models";
import { BiArrowBack } from "react-icons/bi";
import "./Search.css";

const NEWS_SEED = [
  {
    title: "River levels rise after sustained rain in central Luzon",
    location: "Bulacan",
    updated: "10 minutes ago",
    alert: "High",
    summary:
      "Barangay officials report knee-deep flooding near riverside roads with evacuation transport on standby.",
  },
  {
    title: "Coastal communities advised to prepare go-bags",
    location: "Eastern Samar",
    updated: "22 minutes ago",
    alert: "Moderate",
    summary:
      "Emergency teams continue pre-emptive briefings as rain bands are expected overnight.",
  },
  {
    title: "Flash flood warning issued for low-lying districts",
    location: "Cagayan de Oro",
    updated: "35 minutes ago",
    alert: "High",
    summary:
      "Drainage channels are near capacity; residents are urged to avoid riverbanks and underpasses.",
  },
  {
    title: "Rescue boats prepositioned in flood-prone barangays",
    location: "Pampanga",
    updated: "1 hour ago",
    alert: "Moderate",
    summary:
      "Local response unit confirms staged relief packs and continuous weather watch through the evening.",
  },
  {
    title: "Classes suspended in selected towns due to heavy rains",
    location: "Albay",
    updated: "1 hour ago",
    alert: "Low",
    summary:
      "Schools shift to modular activities while roads in upland areas are being inspected for landslide risk.",
  },
  {
    title: "Power interruptions reported after overnight storm cells",
    location: "Iloilo",
    updated: "2 hours ago",
    alert: "Moderate",
    summary:
      "Utility crews are restoring lines while municipal halls coordinate temporary charging stations.",
  },
];

const Search = ({ searchIsVisible, closeSearch }: any) => {
  return (
    <div
      className={`search__container search__container--${
        searchIsVisible && "active"
      }`}
    >
      <div className="search__header">
        <span
          className="search__header__close"
          role="button"
          onClick={() => closeSearch()}
        >
          <BiArrowBack />
        </span>
        <span className="search__header__title">Flood & Disaster Feed</span>
      </div>
      <div className="search__list">
        {NEWS_SEED.map((item) => (
          <div
            key={`${item.title}-${item.location}`}
            className="search__list__item"
          >
            <div className="search__list__item__meta">
              <span>{item.location}</span>
              <span
                className={`search__list__item__alert search__list__item__alert--${item.alert.toLowerCase()}`}
              >
                {item.alert}
              </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <small>Updated {item.updated}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const { search } = state;
  return { searchIsVisible: search.searchIsVisible };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    closeSearch: () => dispatch(setSearchVisibility(false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
